import os

renames = [
    'happy_01',
    'angry_01'
]

files = []
for filename in os.listdir("./"):
    if(filename.endswith(".png")):
        files.append(filename)
# print(files)

i = 0
for file in files:
    os.rename(file, renames[i]+'.png')
    i += 1
