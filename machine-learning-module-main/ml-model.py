from flask import Flask, json
import os
import sys
import pickle
import joblib
import xgboost as xgb
import numpy as np
# import tensorflow as tf
# sys.path.append('lib')
from sklearn.preprocessing import MinMaxScaler
from sqlalchemy import create_engine
import numpy as np
import tensorflow as tf
from tensorflow import keras
from datetime import timedelta
# from flask.ext.cors import CORS, cross_origin

import pandas as pd
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/demurrage', methods=['GET'])
@cross_origin()
def get_monthly_demurrage():
  # connect to db
  db_connection_str = 'mysql+pymysql://root:admin123@fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com/fusionx'
    
  # fusionxdb = mysql.connector.connect(
  #     host="fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com",
  #     user="root",
  #     password="admin123",
  #     database="fusionx"
  # )
  np.random.seed(7)
  # cursor=fusionxdb.cursor()
  selectQuery="SELECT `year_month`,demurrage from MonthlyDemurrage ORDER BY id DESC"
  
  # cursor.execute(selectQuery)
  db_connection = create_engine(db_connection_str)

# read from db 
  df = pd.read_sql(selectQuery, con=db_connection)
  # df["last_month"]=df["last_month"].astype(int)
  # df["last_month_1"]=df["last_month_1"].astype(int)
  # df["last_month_2"]=df["last_month_2"].astype(int)
  print(df)
  df_this_month=df.drop(['year_month'],axis=1)
  scaler = MinMaxScaler(feature_range=(0, 1))

  df_this_month = scaler.fit_transform(df_this_month)
  print(df_this_month)
  # df_this_month=np.array(df_this_month)
  look_back=3
  df_this_month,sample_y=create_dataset(df_this_month, look_back)
  print(df_this_month)

  df_this_month=np.reshape(df_this_month, (df_this_month.shape[0], df_this_month.shape[1], 1))
  # df_this_month = np.reshape(df_this_month, (df_this_month.shape[0], df_this_month.shape[1], 1))

  # df['expected_clearing_date']=pd.to_datetime(df['expected_clearing_date'])

  # tx_predict=df.drop(['givenID','created_date','expected_clearing_date'],axis=1)

  # client = storage.Client()
  # bucket = client.get_bucket('test-minio-data-backup-source')
  # blob = bucket.blob("finalized_model.sav")
  # blob.download_to_filename('finalized_model.sav')
  # filename = 'monthly.sav'
  dir=os.path.abspath(os.getcwd())

  path=dir+"/saved_model_dir"
  classifier = keras.models.load_model(path)
  # classifier = tf.load("saved_model.pb")
  print(df)
  pred_data=classifier.predict(df_this_month)
  print(df)
  print(df.dtypes)
  print(pred_data)
  
  res=scaler.inverse_transform(pred_data)
  print(res)

  prediction = res.tolist()
  reversed_arr = prediction[::-1]
  reversed_arr_data=reversed_arr[0]
  # results = cursor.fetchall()

  # cargo_id=df['givenID']
  # response={}
  response_array=[]
  month_selected=df['year_month']
  given_value=df['demurrage']
  value_dict={}
  value_dict['date-month']="2021/05"
  value_dict['Demurrage']=reversed_arr_data[0]
  response_array.append(value_dict)
  for x in range(len(df)):
        value_dict={}
        value_dict['date-month']=month_selected[x]
        value_dict['Demurrage']=float(given_value[x])
        response_array.append(value_dict)
  
  # Append the predicted values
  
  # # results = cursor.fetchall()
  # response["response"]=response_array

  # obj=json.dumps(response).replace('\\', '')

  

  
  
  print(response_array)
  # response_array.sort(key=lambda x: x[0]['date-month'], reverse=True)
  return json.dumps(response_array)

def create_dataset(dataset, look_back=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-look_back-1):
        a = dataset[i:(i+look_back), 0]
        dataX.append(a)
        dataY.append(dataset[i + look_back, 0])
    return np.array(dataX), np.array(dataY)

@app.route('/activities', methods=['GET'])
@cross_origin()
def get_activites():
  db_connection_str = 'mysql+pymysql://root:admin123@fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com/fusionx'
    
  # fusionxdb = mysql.connector.connect(
  #     host="fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com",
  #     user="root",
  #     password="admin123",
  #     database="fusionx"
  # )
  
  # cursor=fusionxdb.cursor()
  selectQuery="""SELECT cont.containerGivenID AS givenID,
      case 
          when (usr.departmentId=2 )   then 2
          when (usr.departmentId=1 )   then 1
          else 0
      end
      as responsible_dept,
      case 
          when (tp.id=2 )   then 2
          when (tp.id=1 )   then 1
          else 0
      end
      as supplier_of_the_container,
      1 AS status_direct_container_to_warehouse,
      (SELECT CASE
          WHEN (wh.wareHouseStatus='ACTIVE') then 1
          ELSE 0
      END FROM WareHouse wh WHERE wh.id=1)AS status_loading_bay,
      1 AS document_clearing_delays_available,
      1 AS unloading_delays_available,
      1 AS warehouse_waitting_available,
      DAYOFWEEK(ac.createdDate) AS arrived_day_of_week,
      HOUR(ac.createdDate) AS arrived_hour_of_day,
      ac.createdDate AS created_date,
      ac.expectedClearingDate AS expected_clearing_date
      from Activities ac,Users usr, Containers cont, ThirdParty tp
      WHERE ac.createdUser=usr.id
      AND ac.containerId=cont.id
      AND ac.thirdPartyId=tp.id
  """
  # cursor.execute(selectQuery)
  db_connection = create_engine(db_connection_str)

  df = pd.read_sql(selectQuery, con=db_connection)

  # df['expected_clearing_date']=pd.to_datetime(df['expected_clearing_date'])
  created_dt=df['created_date']
  initial_created_date=df['created_date']
  tx_predict=df.drop(['givenID','created_date','expected_clearing_date'],axis=1)

  # client = storage.Client()
  # bucket = client.get_bucket('test-minio-data-backup-source')
  # blob = bucket.blob("finalized_model.sav")
  # blob.download_to_filename('finalized_model.sav')
  filename = 'model_activities.sav'
  # classifier = pickle.load(open(filename, 'rb'))
  classifier=joblib.load(filename)
  # classifier = xgb.XGBClassifier()
  # booster = xgb.Booster()
  # classifier = booster.load_model(filename)
  # classifier._Booster = booster

  pred_data=classifier.predict(tx_predict)
  print(df)
  print(df.dtypes)
  print(pred_data)

  pred_data_for_date=pred_data.tolist()
  # get expected time 
  print("as int")
  print(pred_data)

  # pred_data_for_date=pred_data_for_date.astype(int)
  
  # try to get values from prediction data 
  predicted_date=created_dt
  for cal in range(len(pred_data)):
    predicted_date[cal]= created_dt[cal]+ timedelta(days=int(pred_data_for_date[cal]))

  print(predicted_date)
  

  days = np.busday_count( initial_created_date.dt.date,  predicted_date.dt.date)

  print(days)



  cargo_id=df['givenID']
  response={}
  response_array=[]
  for x in range(len(pred_data)):
        value_dict={}
        value_dict['cargo_id']=cargo_id[x]
        value_dict['predicted']=pred_data[x]*8*200
        response_array.append(value_dict)
  # results = cursor.fetchall()
  


  obj=json.dumps(response_array).replace('\\', '')

  return obj

def calculate_demurrage(values_given):
      if values_given> 3:
            if values_given<11:
                  return (values_given-3)*8
            else:
                  if values_given<19:
                        return  ((values_given-3)*8)+((values_given-11)*7)
                  else:
                        if values_given<26:
                              return ((values_given-3)*8)+((values_given-11)*7)+((values_given-19)*7)
                        else:
                              return values_given-3*15
      else:
            return 0

@app.route('/demurrage_mobile', methods=['GET'])
@cross_origin()
def get_monthly_demurrage_mobile():
  # connect to db
  db_connection_str = 'mysql+pymysql://root:admin123@fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com/fusionx'
    
  # fusionxdb = mysql.connector.connect(
  #     host="fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com",
  #     user="root",
  #     password="admin123",
  #     database="fusionx"
  # )
  np.random.seed(7)
  # cursor=fusionxdb.cursor()
  selectQuery="SELECT `year_month`,demurrage from MonthlyDemurrage ORDER BY id DESC"
  
  # cursor.execute(selectQuery)
  db_connection = create_engine(db_connection_str)

# read from db 
  df = pd.read_sql(selectQuery, con=db_connection)
  # df["last_month"]=df["last_month"].astype(int)
  # df["last_month_1"]=df["last_month_1"].astype(int)
  # df["last_month_2"]=df["last_month_2"].astype(int)
  print(df)
  df_this_month=df.drop(['year_month'],axis=1)
  scaler = MinMaxScaler(feature_range=(0, 1))

  df_this_month = scaler.fit_transform(df_this_month)
  print(df_this_month)
  # df_this_month=np.array(df_this_month)
  look_back=3
  df_this_month,sample_y=create_dataset(df_this_month, look_back)
  print(df_this_month)

  df_this_month=np.reshape(df_this_month, (df_this_month.shape[0], df_this_month.shape[1], 1))
  # df_this_month = np.reshape(df_this_month, (df_this_month.shape[0], df_this_month.shape[1], 1))

  # df['expected_clearing_date']=pd.to_datetime(df['expected_clearing_date'])

  # tx_predict=df.drop(['givenID','created_date','expected_clearing_date'],axis=1)

  # client = storage.Client()
  # bucket = client.get_bucket('test-minio-data-backup-source')
  # blob = bucket.blob("finalized_model.sav")
  # blob.download_to_filename('finalized_model.sav')
  # filename = 'monthly.sav'
  dir=os.path.abspath(os.getcwd())

  path=dir+"/saved_model_dir"
  classifier = keras.models.load_model(path)
  # classifier = tf.load("saved_model.pb")
  print(df)
  pred_data=classifier.predict(df_this_month)
  print(df)
  print(df.dtypes)
  print(pred_data)
  
  res=scaler.inverse_transform(pred_data)
  print(res)

  prediction = res.tolist()
  reversed_arr = prediction[::-1]
  reversed_arr_data=reversed_arr[0]
  # results = cursor.fetchall()

  # cargo_id=df['givenID']
  # response={}
  response_array=[]
  month_selected=df['year_month']
  given_value=df['demurrage']
  value_dict={}
  value_dict['date-month']="2021/05"
  value_dict['Demurrage']=reversed_arr_data[0]
  response_array.append(value_dict)
  for x in range(len(df)):
        value_dict={}
        value_dict['date-month']=month_selected[x]
        value_dict['Demurrage']=float(given_value[x])
        response_array.append(value_dict)
  
  # Append the predicted values
  
  # # results = cursor.fetchall()
  # response["response"]=response_array

  # obj=json.dumps(response).replace('\\', '')

  

  
  
  print(response_array)

  mobile_respose={}
  mobile_respose["values"]=response_array
  # response_array.sort(key=lambda x: x[0]['date-month'], reverse=True)
  return mobile_respose



@app.route('/activities_mobile', methods=['GET'])
@cross_origin()
def get_activites_mobile():
  db_connection_str = 'mysql+pymysql://root:admin123@fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com/fusionx'
    
  # fusionxdb = mysql.connector.connect(
  #     host="fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com",
  #     user="root",
  #     password="admin123",
  #     database="fusionx"
  # )
  
  # cursor=fusionxdb.cursor()
  selectQuery="""SELECT cont.containerGivenID AS givenID,
      case 
          when (usr.departmentId=2 )   then 2
          when (usr.departmentId=1 )   then 1
          else 0
      end
      as responsible_dept,
      case 
          when (tp.id=2 )   then 2
          when (tp.id=1 )   then 1
          else 0
      end
      as supplier_of_the_container,
      1 AS status_direct_container_to_warehouse,
      (SELECT CASE
          WHEN (wh.wareHouseStatus='ACTIVE') then 1
          ELSE 0
      END FROM WareHouse wh WHERE wh.id=1)AS status_loading_bay,
      1 AS document_clearing_delays_available,
      1 AS unloading_delays_available,
      1 AS warehouse_waitting_available,
      DAYOFWEEK(ac.createdDate) AS arrived_day_of_week,
      HOUR(ac.createdDate) AS arrived_hour_of_day,
      ac.createdDate AS created_date,
      ac.expectedClearingDate AS expected_clearing_date
      from Activities ac,Users usr, Containers cont, ThirdParty tp
      WHERE ac.createdUser=usr.id
      AND ac.containerId=cont.id
      AND ac.thirdPartyId=tp.id
  """
  # cursor.execute(selectQuery)
  db_connection = create_engine(db_connection_str)

  df = pd.read_sql(selectQuery, con=db_connection)

  # df['expected_clearing_date']=pd.to_datetime(df['expected_clearing_date'])

  tx_predict=df.drop(['givenID','created_date','expected_clearing_date'],axis=1)

  # client = storage.Client()
  # bucket = client.get_bucket('test-minio-data-backup-source')
  # blob = bucket.blob("finalized_model.sav")
  # blob.download_to_filename('finalized_model.sav')
  filename = 'model_activities.sav'
  # classifier = pickle.load(open(filename, 'rb'))
  classifier=joblib.load(filename)
  # classifier = xgb.XGBClassifier()
  # booster = xgb.Booster()
  # classifier = booster.load_model(filename)
  # classifier._Booster = booster

  pred_data=classifier.predict(tx_predict)
  print(df)
  print(df.dtypes)
  print(pred_data)

  cargo_id=df['givenID']
  response={}
  response_array=[]
  for x in range(len(pred_data)):
        value_dict={}
        value_dict['cargo_id']=cargo_id[x]
        value_dict['predicted']=pred_data[x]*8*200
        response_array.append(value_dict)
  # results = cursor.fetchall()
  


 
  mobile_respose={}
  mobile_respose["values"]=response_array
  return mobile_respose


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)