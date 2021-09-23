// Promiseを使うsleep
function sleepByPromise(sec) {
    return new Promise(resolve => setTimeout(resolve, sec*1000));
}

//一番右のタブを閉じる処理
const closeLastTab = async (browser)=>{
    let tabArray = await browser.pages();
    await tabArray[tabArray.length - 1].close();
}

// YT1sのページを開き、入力されたURLを入力し、動画をDLする処理
exports.moveiDL = async (movieURL)=>{

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
    await page.goto('https://yt1s.com/en25');
    console.log("サイトへアクセスしました。");

    // 検索窓のテキストボックスに変数を入力
    await page.type('input[id = s_input]', movieURL);
    console.log("テキストボックスにURLを入力しました。");

    // 検索ボタンをクリック
    await page.click('button[id = btn-convert]');
    await sleepByPromise(5);
    console.log("DLページに遷移しました。");


    //動画DLページに飛ぶ
    // Downloadをクリック
    await page.click('button[id = btn-action]');//Downloadボタンをクリック
    await sleepByPromise(10);//待機 タブが開く時間
    await closeLastTab(browser);//勝手に出てくるタブを閉じる
    console.log("(1回目)DLボタンを押下しました。");

    // Download再びクリック
    await sleepByPromise(10);//待機 コンバートする時間
    await page.click('a[id = asuccess]');//Downloadボタンをクリック さきほどとUIが違う
    await sleepByPromise(10);//待機 タブが開く時間
    await closeLastTab(browser);//勝手に出てくるタブを閉じる
    console.log("(2回目)DLボタンを押下しました。");

    await sleepByPromise(50);//=========================DL中の待機時間なので、長めに設定しておくのが良い======================
    await browser.close();//ブラウザを閉じる
    console.log("処理が完了しました。");
}
