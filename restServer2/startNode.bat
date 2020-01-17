@echo start batch : node server!

for /f %%g in (C:\Users\hw.lee\git\node\restServer2\serverList.txt) DO start node C:\Users\hw.lee\git\node\restServer2\%%g\server.js
@echo Start success!
pause