import json

file = open('pokemon.json', encoding='utf-8')
data = json.load(file)
shan = open('shannpass.txt', encoding='utf-8').readlines()
for i in range(len(shan)):
    shan[i] = shan[i].replace("\n", "")


newdata = ''
for i in range(1, 899):
    if i < 10:
        id = "00" + str(i)
    elif i < 100:
        id = "0" + str(i)
    else:
        id = str(i)

    pokemon = data[id]['slug']['eng']
    if pokemon in shan:
        newdata += "0"
    else:
        newdata += "1"

print(newdata)