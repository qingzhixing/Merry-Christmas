function ChangeHeaderText(emojiId){
    const emojisArray = ['🎄', '🐬', '🦌', '🌟', '🌈'];
    const basicHeaderText = "Merry Christmas";
    let headerTextElement = document.getElementById('header-text');
    if (emojiId > emojisArray.length - 1) emojiId = 0;
    headerTextElement.textContent = basicHeaderText + emojisArray[emojiId];

    setTimeout(function () {
        ChangeHeaderText(emojiId + 1);
        // console.log("Recalled ChangeHeaderText()");
    }, 1000);
}

/* 
* horizontalDirection: 1右 -1左
* verticalDirection: 1下 -1上
*/
function GenerateMoveDirection(horizontalDirection, verticalDirection) {
    return { horizontalDirection, verticalDirection };
}
function GeneratePosition(x, y) {
    return { x, y };
}
function GetElementPositionInfo(element) {
    return {
        leftPosition: element.offsetLeft,
        topPosition: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight
    };
}

function StartMarble(element, moveDirection) {
    // console.log('StartMarble');
    let elementPositionInfo = GetElementPositionInfo(element);
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    const moveSpeed = 3;
    let nextPosition = GeneratePosition(elementPositionInfo.leftPosition, elementPositionInfo.topPosition);
    //horizontal
    if (1 == moveDirection.horizontalDirection) {
        nextPosition.x += moveSpeed;
        if (nextPosition.x+elementPositionInfo.width >= windowWidth) {
            nextPosition.x = windowWidth - elementPositionInfo.width;
            moveDirection.horizontalDirection = -1;
        }
    } else {
        nextPosition.x -= moveSpeed;
        if (nextPosition.x <= 0) {
            nextPosition.x = 0;
            moveDirection.horizontalDirection = 1;
        }
    }
    //vertical
    if (1 == moveDirection.verticalDirection) {
        nextPosition.y += moveSpeed;
        if (nextPosition.y+elementPositionInfo.height >= windowHeight) {
            nextPosition.y = windowHeight - elementPositionInfo.height;
            moveDirection.verticalDirection = -1;
        }
    } else {
        nextPosition.y -= moveSpeed;
        if (nextPosition.y <= 0) {
            nextPosition.y = 0;
            moveDirection.verticalDirection = 1;
        }
    }

    element.style.left = nextPosition.x + 'px';
    element.style.top = nextPosition.y + 'px';
    setTimeout(() => { StartMarble(element, moveDirection) }, 18);

}

function MoveMarble() {
    let marbleElements = document.getElementsByClassName('marble');
    for (let i = 0; i < marbleElements.length; i++) {
        let marble = marbleElements[i];
        StartMarble(marble,GenerateMoveDirection(1,1))
    }
}

window.onload = () => {   
    ChangeHeaderText(0);
    MoveMarble();
}