Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
Dim scriptDir
Dim cmd 
scriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
cmd = "node.exe "& scriptDir &"\scripts\tempNodeRepl.js " & strArgs
oShell.Run cmd, 0, false