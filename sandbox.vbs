Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
Set namedArgs = WScript.Arguments.Named
If namedArgs.Exists("global-node") Then
   strArgs = "global-node"
Else  
   strArgs = "" 
End If
Dim scriptDir
Dim cmd 
scriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
cmd = scriptDir & "\node8-portable\node.exe "& scriptDir &"\scripts\tempNode.js " & strArgs
oShell.Run cmd, 0, false