const companies = [
    { name: "東京海上", question: "キャパ太郎の使命は？", options: ["", "保険会社を困らせる", "ブローカーが楽しむ", "お客様を守る"], correctAnswer: "お客様を守る" },
    { name: "三井住友", question: "保険のメリットは？", options: ["", "なんでも払ってくれる", "みんなで痛み分け", "株主に言い訳できる"], correctAnswer: "みんなで痛み分け" },
    { name: "損保ジャパン", question: "どうしたらキャパが増える？", options: ["", "ネゴる", "スネる", "情報出す"], correctAnswer: "情報出す" },
    { name: "あいおい", question: "リスクの見方は？", options: ["", "定規で測る", "現場に行く", "心の声を聴く"], correctAnswer: "都心" },
    { name: "AIG", question: "保険料の決め方は？", options: ["", "リスク分析結果", "ガッツフィーリング", "みんなで仲良く相談"], correctAnswer: "リスク分析結果" },
];

let currentCapacity = 0;
let currentCompanyIndex = 0;
const totalCapacityNeeded = 100;

function startGame() {
    currentCapacity = 0;
    currentCompanyIndex = 0;
    document.getElementById("capacityDisplay").textContent = `「キャパ太郎」の現在のキャパシティ: ${currentCapacity}%`;
    document.getElementById("result").textContent = "";
    document.getElementById("companyStatus").innerHTML = "";
    companies.forEach(company => {
        document.getElementById("companyStatus").innerHTML += `
                    <p>${company.name}</p>
                    <div class="capacity-bar"><div id="${company.name}-bar" class="capacity-fill" style="width: 0%;">0%</div></div>
                `;
    });
    nextQuestion();
}

function nextQuestion() {
    if (currentCompanyIndex < companies.length) {
        const company = companies[currentCompanyIndex];
        document.getElementById("companyQuestion").textContent = `${company.name}の質問: ${company.question}`;
        const select = document.getElementById("userAnswer");
        select.innerHTML = ""; // 選択肢リセット
        company.options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        document.getElementById("questionSection").style.display = "block";
    } else {
        endGame();
    }
}

function submitAnswer() {
    const userAnswer = document.getElementById("userAnswer").value;
    const company = companies[currentCompanyIndex];

    let capacityGain = 0;

    if (userAnswer === company.correctAnswer) {
        capacityGain = Math.floor(Math.random() * 20) + 10; // 正解時に10～30％のランダムなキャパシティ獲得
    } else {
        capacityGain = Math.floor(Math.random() * 10); // 不正解時に0～10％のランダムなキャパシティ獲得
    }

    currentCapacity += capacityGain;
    document.getElementById("capacityDisplay").textContent = `「キャパ太郎」の現在のキャパシティ: ${currentCapacity}%`;

    // 棒グラフ更新
    const progressBar = document.getElementById(`${company.name}-bar`);
    progressBar.style.width = `${capacityGain}%`;
    progressBar.textContent = `${capacityGain}%`;

    currentCompanyIndex++;
    nextQuestion();
}

function endGame() {
    document.getElementById("questionSection").style.display = "none";
    if (currentCapacity >= totalCapacityNeeded) {
        document.getElementById("result").textContent = "おめでとう！キャパ１００％埋まりました！";
    } else {
        document.getElementById("result").textContent = "残念！キャパ埋まらず。。。出直してこーい！";
    }
}

const comments = [
    "MISSION!!!","お客さまから「保険購入」の依頼あり。","ただちに５つの保険会社にあたり、保険を１００％集めよ。",
    "「キャパ太郎」とは保険会社から１００％のキャパシティ（保険）を集めるゲーム。",
    "さあ、質問に答えてキャパを集めよう！！！"
]

let commentIndex = 0;
let charIndex = 0;
const commentElement = document.getElementById("comment");
const keySound = document.getElementById("keySound");

function playKeySound() {
    keySound.currentTime = 0; // 再生を最初からリセット
    keySound.play(); // 音を再生
}

function displayNextCharacter() {
    if (commentIndex >= comments.length) return;

    const currentComment = comments[commentIndex];

    if (charIndex < currentComment.length) {
        commentElement.textContent += currentComment[charIndex];
        playKeySound();
        charIndex++;
        setTimeout(displayNextCharacter, 100); // 次の文字を0.1秒後に表示
    }

    else {
        charIndex = 0;
        commentIndex++;

        setTimeout(() => {
            commentElement.textContent = ''; // 次のコメントのためにクリア
            displayNextCharacter(); // 次のコメントを表示
        }

            , 1500); // 次のコメントを表示するまでの待機時間
    }
}

// ゲーム開始時またはコメント表示開始時に呼び出す
displayNextCharacter();