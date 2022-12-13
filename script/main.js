window.onload = () => {   
    let emojisArray = ['🎄', '🐬', '🦌', '🌟', '🌈'];

    let ChangeHeaderText = (emojiId) => {
        let basicHeaderText = "Merry Christmas";
        let headerTextElement = document.getElementById('header-text');
        if (emojiId > emojisArray.length - 1) emojiId = 0;
        headerTextElement.textContent = basicHeaderText + emojisArray[emojiId];

        setTimeout(function () {
            ChangeHeaderText(emojiId + 1);
            // console.log("Recalled ChangeHeaderText()");
        }, 1000);
    }

    ChangeHeaderText(0);
}