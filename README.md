# revSrtCleanup
Clean up the formatting of SRT files from Rev

Files from Rev have some extraneous markings, like hyphens to indicate someone is speaking, speaker indications in brackets, and sound effects in parentheses. This script will remove these and put any two-line captions on one line.

Steps:
1. Put all SRT files in a single folder.
2. Download this script in that same folder. 
3. Navigate to that folder in the terminal and run the command `python revCleanup.py`.
4. Your cleaned up files will appear in the same folder with have the same root names but with the extension "new.SRT."
