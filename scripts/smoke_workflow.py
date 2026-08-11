import json,os,re,time
from genlayer_py import create_client,create_account
from genlayer_py.chains import studionet
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));WORKSPACE=os.path.abspath(os.path.join(ROOT,'..','..','..','..'))
def value(name):
 s=open(os.path.join(WORKSPACE,'accounts.env'),encoding='utf-8').read();m=re.search(rf'^\s*{name}\s*=\s*"?([^"\r\n]+)',s,re.M);return m.group(1).strip()
def accepted(c,h):
 print(json.dumps({'submitted':h}),flush=True);c.wait_for_transaction_receipt(transaction_hash=h,status='ACCEPTED',retries=100,interval=15000);t=c.get_transaction(transaction_hash=h);print(json.dumps({'tx':h,'status':t.get('status_name')}),flush=True)
 if t.get('status_name')!='ACCEPTED':raise SystemExit(2)
account=create_account(account_private_key=value('ACCOUNT_2_GENLAYER_PRIVATE_KEY'));client=create_client(chain=studionet,account=account);address=json.load(open(os.path.join(ROOT,'deployment.json')))['contract'];pid='GW-WEB-'+str(int(time.time()))
h=client.write_contract(address=address,function_name='submit_witness_package',args=[pid,'Build and transfer an open public sensor network to six neighbourhood councils.',['Six sensor locations are publicly documented','Public readings remain openly accessible','Operational custody is accepted by every council'],'Deploy community sensor mesh',['https://www.epa.gov/air-sensor-toolbox/air-sensor-data-tools'],42000]);accepted(client,h)
print(json.dumps({'package':pid,'contract':address,'tx':h}),flush=True)
