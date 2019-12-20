Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "node8-portable\node.exe scripts\tempNode.js"
oShell.Run strArgs, 0, false