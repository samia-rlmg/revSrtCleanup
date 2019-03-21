#Clean up the SRT file produced by Rev

import glob, os

fileArr = [] # create a file to hold all SRT files in a given folder

os.chdir(".") # run script on files in the current directory
for file in glob.glob("*.srt"):  # add each SRT file to the array of files
    fileArr.append(file)

for revfile in fileArr:
    fileroot = revfile.split(".") # get the root of the file
    fileroot[len(fileroot)-1] = "new.SRT" # create a new filename with the same root as the original file but a new extension
    newfile = ".".join(fileroot)

    counter=0

    # Initialize arrays that will hold the three lines for each entry of the SRT file
    counterArr = []
    timecodeArr = []
    textArr = []

    with open(revfile) as rf:
        for line in rf:
            if line.isspace(): # reset the counter after every space, which marks a new entry
                counter=0
            else:
                counter+=1
            if counter==1:
                counterArr.append(line)
            if counter==2:
                timecodeArr.append(line)
            if counter==3:
                if line.split(' ')[0]=='-': # remove hyphens at the beginning of a line
                    lineSplit = line.split(' ')
                    line = ' '.join(lineSplit[1:])
                if line[0]=='[': # remove any speaker indicators, which are inside []
                    lineSplit = line.split('] ')
                    line = ' '.join(lineSplit[1:])
                    print(line)
                textArr.append(line)
            if counter==4: # if there is a fourth line, append its contents to the third line
                textArr[len(textArr)-1] += line
                textArr[len(textArr)-1] = " ".join(textArr[len(textArr)-1].split('\n')) + '\n'

    rf.close()

    srtfile = open(newfile, "w")
    print(len(counterArr), len(timecodeArr), len(textArr))

    # Write the contents of each array, now properly formatted, into a new file
    for i, entry in enumerate(counterArr):
        srtfile.write(counterArr[i])
        srtfile.write(timecodeArr[i])
        srtfile.write(textArr[i])
        srtfile.write('\n')

    srtfile.close()
