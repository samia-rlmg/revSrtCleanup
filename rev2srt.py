#Convert REV file to SRT

import glob, os

fileArr = []

os.chdir(".")
for file in glob.glob("*.txt"):
    fileArr.append(file)

# print(",".join(fileArr))

for revfile in fileArr:
    fileroot = revfile.split(".")
    fileroot[len(fileroot)-1] = "srt"
    newfile = ".".join(fileroot)

    counter=0
    counterArr = []
    timecodeArr = []
    textArr = []

    with open(revfile) as rf:
        line = rf.readline()
        for line in rf:
            if not line.isspace():
                lineArr = line.split("  ")
                lineArr = filter(None, lineArr)
                counterArr.append(str(counter))
                if len(lineArr) == 1:
                    timecodeArr.append('')
                    textArr.append(lineArr[0].strip())
                else:
                    timecodeArr.append(lineArr[1].strip())
                    textArr.append(lineArr[2].strip())
                counter+=1

    rf.close()

    srtfile = open(newfile, "w")

    for i, entry in enumerate(counterArr):
        srtfile.write(entry + '\n')
        timeSplit = timecodeArr[i].split(":")
        print(timecodeArr[i])
        if len(timeSplit) < 2:
            timecodeArr[i] = timecodeArr[i-1]
            timeSplit = timecodeArr[i].split(":")
        if len(timeSplit) < 2:
            timecodeArr[i] = "00:00"
            timeSplit = timecodeArr[i].split(":")
        print(timeSplit)
        if i != len(counterArr)-1:
            srtfile.write('00:'+timecodeArr[i] + ',000 --> 00:' + timecodeArr[i+1] + ',000' + '\n')
        else:
            secLeft = divmod(int(float(timeSplit[0]))*60 + int(float(timeSplit[1]))+5, 60)
            endStamp = "{:0>2d}".format(secLeft[0]) + ":" + "{:0>2d}".format(secLeft[1])
            srtfile.write('00:'+timecodeArr[i] + ',000 --> 00:' + endStamp + ',000' + '\n')
        srtfile.write(textArr[i] + '\n')
        srtfile.write('\n')

    srtfile.close()
