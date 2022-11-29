import json

file = open('pokemon.json', encoding='utf-8')
data = json.load(file)
newdata = []
for i in range(1, 899):
    if i < 10:
        id = "00" + str(i)
    elif i < 100:
        id = "0" + str(i)
    else:
        id = str(i)
    newdata.append(data[id]['slug']['eng'])
print(newdata)