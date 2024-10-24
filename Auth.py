import BlockchainTech as BC
import hashlib
import json
import base64

def login(bc:BC.Blockchain, id:int, password:str) -> int:

    def hash_actions(hash:str):
        # open the json file and load the data
        with open(rf'core\blocks\{hash}.json', 'rb') as f:
            data = json.load(f)[str(0)]
        
        # decrypt the data using the symmetric key
        decrypt_data = eval(BC.sym.decrypt_data(base64.b64decode((data))))
        org_hash, new_hash = decrypt_data['password'], hashlib.sha256(password.encode()).hexdigest()
        
        # compare the hashes
        if org_hash == new_hash:
            return 1
        return 0

    for row in bc.hashmap:
        if row[0] == id:
            return hash_actions(row[1])
    print("[x] User not found")

def register(bc:BC.Blockchain, name:str, username:str, password:str):
    data = {'name': name, 'username': username, 'password': hashlib.sha256(password.encode()).hexdigest()}
    bc.create_new_block(data)

############################################

if __name__ == '__main__':

    bc = BC.Blockchain()

    if int(input('\nLogin (1) or Register (2): ')) == 1:
        try:
            id = int(input('[LOGIN] Enter your User ID: '))
        except:
            print('[x] Invalid User ID')
            exit()
        password = input('[LOGIN] Enter your password: ')
        print(login(bc, id, password))

    else:
        name = input('[REGISTER] Enter the name: ')
        username = input('[REGISTER] Enter the username: ')
        password = hashlib.sha256(input('[REGISTER] Enter the password: ').encode()).hexdigest()
        register(bc, name, username, password)