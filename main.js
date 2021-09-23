//10秒待ち，Youtubeに飛び，引数にあるページにアクセスする。
const pageSearch = async (movieURL)=>{

    //モジュール読みこみ
    const puppeteer = require('puppeteer');

    // Puppeteerの起動.
    const browser = await puppeteer.launch({
        headless: false, // Headlessモードで起動するかどうか.
        slowMo: 5, // 指定のミリ秒スローモーションで実行する.
    });
    
    // 新しい空のページを開く.
    const page = await browser.newPage();
    
    // view portの設定.
    await page.setViewport({
        width: 1200,
        height: 800,
    });
    
    // YTのWebページにアクセス
    await page.goto('https://www.youtube.com');

    // 検索ボタンをクリック
    await page.click('input[id = search]');

    // 検索窓のテキストボックスに変数を入力
    await page.type('input[id = search]', movieURL);

    // 検索ボタンをクリック
    await page.click('button[id = search-icon-legacy]');

    await sleepByPromise(5);

}

const movieAutoDL = async (urlArray, mdl)=>{
    for (let index = 0; index < urlArray.length; index++) {
        await mdl.moveiDL(urlArray[index]);
    }
}

const readTextFile = (filePath)=>{
    const fs = require('fs');
    const text = fs.readFileSync(filePath, 'utf8');
    const lines = text.split(/\n/);
    return lines;
}


const yt1s = require("./yt1s");//使用するサイトのモジュール
urlArray = readTextFile('./config/downloadList.txt');//テキストファイルを1行ずつ読み取り配列に格納
movieAutoDL(urlArray, yt1s);
