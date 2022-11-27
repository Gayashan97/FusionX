import json
import os
import sys
import joblib
# import xgboost as xgb
sys.path.append('lib')
from sqlalchemy import create_engine
from sklearn.preprocessing import MinMaxScaler

import pandas as pd


def get_predictions(event,context):
    db_connection_str = 'mysql+pymysql://root:admin123@fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com/fusionx'
    
    # fusionxdb = mysql.connector.connect(
    #     host="fusionx-database.cm2ioaxu6xnv.ap-southeast-1.rds.amazonaws.com",
    #     user="root",
    #     password="admin123",
    #     database="fusionx"
    # )
    
    # cursor=fusionxdb.cursor()
    selectQuery="""SELECT (SELECT demurrage FROM MonthlyDemurrage WHERE id=(SELECT MAX(id) FROM MonthlyDemurrage))  last_month,
        (SELECT demurrage FROM MonthlyDemurrage WHERE id=(SELECT MAX(id)-1 FROM MonthlyDemurrage)) AS last_month_1,
        (SELECT demurrage FROM MonthlyDemurrage WHERE id=(SELECT MAX(id)-2 FROM MonthlyDemurrage)) AS last_month_2
    """
    # cursor.execute(selectQuery)
    db_connection = create_engine(db_connection_str)

    df = pd.read_sql(selectQuery, con=db_connection)
    scaler = MinMaxScaler(feature_range=(0, 1))
    df = scaler.fit_transform(df)

    # df['expected_clearing_date']=pd.to_datetime(df['expected_clearing_date'])

    # tx_predict=df.drop(['givenID','created_date','expected_clearing_date'],axis=1)

    # client = storage.Client()
    # bucket = client.get_bucket('test-minio-data-backup-source')
    # blob = bucket.blob("finalized_model.sav")
    # blob.download_to_filename('finalized_model.sav')
    # filename = 'finalized_model.sav'
    classifier = joblib.load('model_monthly.joblib')
    # classifier = pickle.load(open(filename, 'rb'))

    pred_data=classifier.predict(tx_predict)
    print(df)
    print(df.dtypes)
    print(pred_data)
    # results = cursor.fetchall()
    
    return{
        'statusCode':200,
        'body':json.dumps("test")
    }