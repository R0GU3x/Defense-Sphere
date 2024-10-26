import hashlib
import json
import base64
import os
# ==========================
try:
    import core.BlockchainTech as BC
except:
    import BlockchainTech as BC
# ===========================

def login(id:int, password:str) -> int:

    bc = BC.Blockchain()

    def hash_actions(hash:str):
        # open the json file and load the data
        with open(rf'core\blocks\{hash}.json', 'rb') as f:
            data = json.load(f)[str(0)]
        
        # decrypt the data using the symmetric key
        decrypt_data = eval(BC.sym.decrypt_data(base64.b64decode((data))))
        org_hash, new_hash = decrypt_data['password'], hashlib.sha256(password.encode()).hexdigest()
        
        # print(decrypt_data)

        # compare the hashes
        if org_hash == new_hash:
            # sucess
            return (0, decrypt_data['name'], decrypt_data['username'])
        # wrong password
        return (1, None, None)

    for row in bc.hashmap:
        if row[0] == id:
            return hash_actions(row[1])

    # user not found
    return (2, None, None)

def register(name:str, username:str, password:str):

    bc = BC.Blockchain()

    # check if the user alredy exists or not
    usernames = []
    for hashFile in os.listdir(rf'core\blocks'):
        with open(rf'core\blocks\{hashFile}', 'rb') as f:
            data = json.load(f)[str(0)]
        
        decrypt_data = eval(BC.sym.decrypt_data(base64.b64decode((data))))
        usernames.append(decrypt_data['username'])
    
    if username in usernames:
        return -1

    data = {'name': name, 'username': username, 'password': hashlib.sha256(password.encode()).hexdigest()}
    return bc.create_new_block(data)

############################################

if __name__ == '__main__':

    if int(input('\nLogin (1) or Register (2): ')) == 1:
        try:
            id = int(input('[LOGIN] Enter your User ID: '))
        except:
            print('[x] Invalid User ID')
            exit()
        password = input('[LOGIN] Enter your password: ')
        print(login(id, password))

    else:
        name = input('[REGISTER] Enter the name: ')
        username = input('[REGISTER] Enter the username: ')
        password = hashlib.sha256(input('[REGISTER] Enter the password: ').encode()).hexdigest()
        register(name, username, password)