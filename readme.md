# Nodejs as win32 scripting language proof of concept

Currently there is single script in place, which creates local "sandbox" env from template and starts Visual Studio Code with that workspace. 
Template has its own `.vscode` folder so vscode terminal and debug task in launch.json are both configured to use local version of nodejs - not the global one. 

Probably it is worth to add [auto-install](https://github.com/siddharthkp/auto-install) as well so there is no need to relay on globally installed packages. 

Node 8.8.0 is included in this repo for timebeing. 
I plan to replace it with one of node virtualenv substitutes later on. 

Once you close Visual Studio you will get prompt asking if files from closed workspace should be deleted or moved to 'saved' path.



The idea behind this whole thing might seem not very smart, but there is so many packages utilizing native win32 system api, that it is as good choice as any. With one huge advantage for me - i  choose javascript over .bat, powershell and even autohotkey, hands down. 
Node 8.8.0 exe file is ~22mb + npm ~24mb... I can definetly live with that.

And the sandbox .. well it just works with everything you throw at it, unlike codesandboxes etc ;)




