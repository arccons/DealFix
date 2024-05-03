import os, json
from API import MSsql as DB

fileStr = f"{__file__.strip(os.getcwd())}"

readCursor, DBconn = DB.connect_to_DB()

def getDeals():
    fnStr = fileStr + "::getDeals"

    dealList = readCursor.execute(DB.getDealsSQL()).fetchall()
    list_of_dicts = [{'id': item[0].rstrip(" "), 
                      'dealName': item[1],
                      'effectiveDate': str(item[2]),
                      'closingDate': str(item[3]),
                      'subSector': item[4],
                      'isLiquid': item[5].rstrip(" ")} for item in dealList]
    json_dealList = json.dumps(list_of_dicts)
    #print(json_dealList)

    return {'retVal': True, 'dealList': json_dealList}

def updateDeal(dealID, effectiveDate, closingDate, subSector, isLiquid):
    fnStr = fileStr + "::updateDeal"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateDealSQL(dealID, effectiveDate, closingDate, subSector, isLiquid)
    #print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedDeal': dealID}

def getMappings(dealID):
    fnStr = fileStr + "::getMappings"

    sql_stmt = DB.getMappingsSQL(dealID)
    print(sql_stmt)
    dealList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'deal_id': item[0].rstrip(" "), 
                      'fund_name': item[1].rstrip(" "),
                      'as_of_date': str(item[2]),
                      'local_cmmt': item[3],
                      'is_active': item[4],
                      'realized_irr': item[5],
                      'realized_pnl': item[6],
                      'realized_date': str(item[7])} for item in dealList]
    json_mappings = json.dumps(list_of_dicts)
    print(json_mappings)

    return {'retVal': True, 'mappingsList': json_mappings}

def updateMapping(dealID, fundName, asOfDate, local_cmmt, is_active, realized_irr, realized_pnl, realized_date):
    fnStr = fileStr + "::updateMapping"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateMappingSQL(dealID, 
                                   fundName, 
                                   asOfDate, 
                                   local_cmmt, 
                                   is_active, 
                                   realized_irr, 
                                   realized_pnl, 
                                   realized_date)
    #print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedMapping': {dealID, fundName, asOfDate}}
