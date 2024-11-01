import requests
import base64

#! DOCUMENTATION: https://newsapi.org/docs

API = base64.b64decode('ZjU3ODk4NmNiNjQ3NDhlMDk5NTZiMjZkNjE3NGRiNjY=').decode()

def run(query:str='Cybersecurity Trends'):

       url = (f'https://newsapi.org/v2/everything?'
              f'q={query}&'
              f'sortBy=relevancy&'
              f'apiKey={API}&'
              f'pageSize=9&'
              f'language=en')

       response = requests.get(url).json()

       return response

if __name__ == '__main__':
       run()