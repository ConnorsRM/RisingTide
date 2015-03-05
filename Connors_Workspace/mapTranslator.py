#!/usr/bin/env python
DIM = 100

mapFile = open("map","r")
output = open("fmMap.js", "w")
mapData = "var islandHeights = [ "

rows = mapFile.read().splitlines()

for i in range(len(rows) - 1):
    rows[i] = "[ " + rows[i].replace(" ", ", ") + " ], "
    mapData += rows[i]
    

rows[-1] = "[ " + rows[-1].replace(" ", ", ") + " ] "
mapData += rows[-1] + " ];"

output.write(mapData)
output.close()
mapFile.close()

print "Map Array generation complete"



