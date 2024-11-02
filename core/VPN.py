from requests_tor import RequestsTor
import os

errorCount = 0

def run():
    # threading.Thread(target=_work).start()
    os.startfile(r'core\tor.exe')

    # connect to the TOR server
    global errorCount
    while errorCount <= 10:
        try:
            rq = RequestsTor(tor_ports=(9050, ), tor_cport=9051)
            rq.get('https://google.com')
            print('Tor Relay Check Compelete')

            # obtain the new IP
            url1 = 'http://httpbin.org/ip'
            ip = eval(rq.get(url1).text)['origin']

            # obtain ip information
            global DATA
            url2 = f'http://ip-api.com/json/{ip}'
            d = rq.get(url2).text
            DATA = eval(d)

            return DATA

        except Exception as e:
            print(f'{e} | Reconnecting...')
            errorCount += 1

