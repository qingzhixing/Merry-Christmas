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
function GenerateRandomMoveDirection(){
    let horizontalDirection=(Math.random()>=0.5)? 1:-1;
    let verticalDirection=(Math.random()>=0.5)? 1:-1;
    return GenerateMoveDirection(horizontalDirection, verticalDirection);
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
function GenerateMarble(element) {
    //minSpeed<=maxSpeed
    const maxSpeed = 5;
    const minSpeed = 1;
    function StartMarble() {
        // console.log('StartMarble');
        let element=this.element;
        let elementPositionInfo = GetElementPositionInfo(element);
        let bodyWidth = Math.max(document.body.clientWidth,window.innerWidth);
        let bodyHeight = Math.max(document.body.clientHeight,window.innerHeight);
        let moveDirection=this.moveDirection;
        let moveSpeed = this.moveSpeed;

        let nextPosition = GeneratePosition(elementPositionInfo.leftPosition, elementPositionInfo.topPosition);
        //horizontal
        if (1 == moveDirection.horizontalDirection) {
            nextPosition.x += moveSpeed;
            if (nextPosition.x+elementPositionInfo.width >= bodyWidth) {
                nextPosition.x = bodyWidth - elementPositionInfo.width;
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
            if (nextPosition.y+elementPositionInfo.height >= bodyHeight) {
                nextPosition.y = bodyHeight - elementPositionInfo.height;
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
        setTimeout(() => { this.StartMarble() }, 18);

    }
    return {
        moveSpeed: Math.random() * (maxSpeed-minSpeed) + minSpeed,
        moveDirection: GenerateRandomMoveDirection(),
        element: element,
        StartMarble: StartMarble
    }
}


function MoveMarble() {
    let marbleElements = document.getElementsByClassName('marble');
    Array.from(marbleElements).forEach(marble => {
        GenerateMarble(marble).StartMarble();
    });
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function Rotate(element,speed){
    let counter=0;
    while(counter<=360){
        counter+=speed;
        if(counter<=360){
            element.style.transform="rotate("+counter+"deg)"
        }
        await sleep(50);
    }
    element.style.transform="rotate("+0+"deg)"
}

async function RotateForever(element,speed){
    while(true){
        await Rotate(element,speed);
    }
}

function HandleRotatingElement(){
    let rotatingElements=document.getElementsByClassName('rotating');
    Array.from(rotatingElements).forEach(rotatingElement => {
        let rotateSpeedAttributes=rotatingElement.attributes.getNamedItem("rotate-speed");
        let rotateSpeed=0;
        if(rotateSpeedAttributes!=null){
            rotateSpeed=parseInt(rotateSpeedAttributes.value);
        }else{
            const minRotateSpeed=1;
            const maxRotateSpeed=5;
            rotateSpeed=Math.random()*(maxRotateSpeed-minRotateSpeed)+minRotateSpeed;
        }
        RotateForever(rotatingElement,rotateSpeed);
    });
}

function MoveElementToRandomPosition(element){
    let bodyWidth = Math.max(document.body.clientWidth,window.innerWidth);
    let bodyHeight = Math.max(document.body.clientHeight,window.innerHeight);
    let randomX=Math.random()*bodyWidth;
    let randomY=Math.random()*bodyHeight;
    element.style.left = randomX+'px';
    element.style.top = randomY+'px';
}
function HandleRandomPositionElement(){
    let randomPositionElements=document.getElementsByClassName("random-position");
    Array.from(randomPositionElements).forEach(MoveElementToRandomPosition);
}

window.onload = () => {   
    ChangeHeaderText(0);
    MoveMarble();
    HandleRotatingElement();
    HandleRandomPositionElement();
    window.onkeydown=(event) => {
        if(event.code=='KeyP'){
            let roarContainer=document.getElementById("roar-container")
            roarContainer.play();
        }
    }
    console.log("@qingzhixing 2022/12/25")
}
