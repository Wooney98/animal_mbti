const main = document.querySelector('#main'); // section id='main'
const qna = document.querySelector('#qna');	// section id='qna'
const result = document.querySelector("#result");
const endPoint = 10; //총 질문 개수
const select=[]; // 사용자가 선택한 answerList를 담는 빈 배열

const select2=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // <알고리즘 개선> pointArray의 value = 0을 10개 선언

function begin(){
	console.log('begin함수 들어옴')
	main.style.WebkitAnimation="fadeOut 1s";
	main.style.animation="fadeOut 1s";
	setTimeout(() => {
		qna.style.WebkitAnimation = "fadeIn 1s"; // animation 1초
		qna.style.animation = "fadeIn 1s";
		setTimeout(() => {
			main.style.display = "none";
      		qna.style.display = "block";
		}, 450)
    let qIdx = 0;
    goNext(qIdx); 
  }, 450);
}


function addAnswer(answerText, qIdx, idx){
	var a = document.querySelector('.answerBox');
	var answer = document.createElement('button'); //지정한 tagName(button)의 HTML요소를 만들어 반환
	answer.classList.add('answerList'); // button요소에 클래스속성값 'answerList'추가
	answer.classList.add('my-3');
	answer.classList.add('py-3');
	answer.classList.add('mx-auto');
	answer.classList.add('fadeIn');
	
	a.appendChild(answer); // answer버튼이 a에 소속되게끔 관계를 만듬
	answer.innerHTML=answerText // .answerBox요소의 자손인 button을 직렬화함
	
	// 버튼 클릭시 버튼 사라지고 다음질문 호출
	answer.addEventListener("click", function(){
		var children = document.querySelectorAll('.answerList');
		for(let i = 0; i<children.length; i++){
			children[i].disabled=true;
			children[i].style.WebkitAnimation="fadeOut 0.5s"; // css부분
			children[i].style.animation="fadeOut 0.5s";
		}
		setTimeout(() =>{
			var target = qnaList[qIdx].a[idx].type;
			for(let i=0; i<target.length; i++){
				select2[target[i]] += 1;
			}	
			
			
			for(let i = 0; i<children.length; i++){
				children[i].style.display = 'none';
			}
			console.log('here')
			console.log(qIdx)
			
			goNext(++qIdx); 
		},450) 
		
	},false)
}

function goNext(qIdx){
	// result 메소드 호출
	if(qIdx === endPoint){
		goResult();
		return;
	}
	
	var t = document.querySelector('.qTitle');
	t.innerHTML = qnaList[qIdx].t;
	
	var q = document.querySelector('.qBox');
	q.innerHTML = qnaList[qIdx].q; 
	

	for(let i in qnaList[qIdx].a){
		addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
	}
	

	var status = document.querySelector('.statusBar');
	status.style.width = (100/endPoint) * (qIdx+1) + '%';
}


function goResult(){
	setResult(); // 여기서 JSON으로 데이터 넘김
	location.href = 'result.html';
}


function calResult(){
  console.log(select2);
  var result = select2.indexOf(Math.max(...select2));
  return result;
}


function setResult(){
	var point = calResult();
	var name = infoList[point].name; 
	var desc = infoList[point].desc;
	var disease = infoList[point].disease;		
	var imgURL = 'img/dogs/image-' + point + '.png'; 
	
	const result = {
		'imgURL' : imgURL,
		'name' : name,
		'desc' : desc,
		'disease' : disease
	}
	
	localStorage.setItem('result', JSON.stringify(result));
}
