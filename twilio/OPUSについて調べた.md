# OPUSについて調べた

こんにちは、[@24guchia](https://twitter.com/24guchia)です。

先日、Twilioクライアントでバージョンアップがあり、OPUSが使えるようになりました。
https://jp.twilio.com/docs/voice/client/javascript/changelog#170-apr-4-2019

OPUSとは音声圧縮コーデックのひとつで、
WebRTCではデファクトスタンダードです。
対して、IP電話ではPCMU(G.711)がデファクトスタンダードです。
一般的には、OPUSのほうが後発のコーデックのため、
品質が良いと言われています。

