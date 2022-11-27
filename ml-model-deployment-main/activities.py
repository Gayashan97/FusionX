import json
import os
import sys
import joblib
# import xgboost as xgb
sys.path.append('lib')
from sqlalchemy import create_engine

import pandas as pd

# from google.cloud import storage


def make_predictions(event,context):

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
    # filename = 'finalized_model.sav'
    classifier = joblib.load('model_activities.joblib')
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
