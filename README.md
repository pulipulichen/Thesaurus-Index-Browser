# Thesaurus-Index-Browser
A PWA for browsing an thesaurus and an index.

Online tool: https://l.pulipuli.info/22/tib

https://l.pulipuli.info/22/tib

----

# TIB改進的方向

## TIB
1. 要加入可以讀取ods的功能
2. 要加入可以載入Google Sheet的功能
3. 搜尋轉譯

## TIB Colab
1. 自動擴展：加上詞跟詞之間的配對
2. 自動判斷參照關係：
- 先瞭解每個詞彙的詞向量
- 取得兩兩詞彙的組合
- 依照USE、NT、BT、RT來掃描
- 如果它已經有(USE, UF)、NT、BT、RT，那就列入計算列表。沒有的話就列入判斷列表。
- 計算列表取得平均值+1標準差作為判斷的基準