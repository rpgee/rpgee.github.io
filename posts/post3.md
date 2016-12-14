Have you ever thought to travel to past and see Dinosaur ? or travel to future and buy a real hover skateboard ?

Then look no further, the solution is here (well, sort of) with _**SinonJs**_(http://sinonjs.org/).

Ok, calm down people. This is just for developers whom didn't know this functionality (at least I didn't know about the time traveling feature before 2 months). So I thought to share it.

I am **Node.Js** developer, so I'm demonstrating this functionality in **Node**_v4.4.3_ with **Mocha**_v3.0.2_ and **Sinon**_v1.17.5_

The function is called "_**useFakeTimers**_". You can read more in _**http://sinonjs.org/docs/**_ under "_**Fake timers API**_".

Important thing is; when using "useFakeTimers", the value which you pass,

> now should be milliseconds since UNIX epoch

My code is as follows,

![](https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAd8AAAAJDRhNmJlMTk4LTQyNzctNDUyZC04MWQ1LWE0YzE0MjZjZmVlYw.png)

And the output is as follows,

![](https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAfwAAAAJGQ4ZmVmZTQ0LTg1ZDUtNDY0Ny1hYzhjLTI2NzhkNWMzMDY5ZQ.png)

So, this is very useful functionality when you want to simulate date changes during tests.

I hope you like this and useful for you.

Finally I just want to say,

> **The past is history, the future is a mystery, but today is a gift. That is why it is called the present!**