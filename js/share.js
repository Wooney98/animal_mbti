function screenShot() {
	console.log('screenshot 입장');
    html2canvas(document.getElementById("result"))
        .then(
            function (canvas) { 
                drawImg(canvas.toDataURL('image/png'));
                saveAs(canvas.toDataURL(), 'dang_bti_ResultPage.png');
            }).catch(function (err) {
                console.log(err);
            });
}


function drawImg(imgData) {
    console.log(imgData);
    return new Promise(function reslove() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        //canvas의 뿌려진 부분 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var imageObj = new Image();
        imageObj.onload = function () {
            ctx.drawImage(imageObj, 10, 10);
            //canvas img를 그리겠다.
        };
        imageObj.src = imgData;
        //그릴 image데이터를 넣어준다.

    }, function reject() { });
}


function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}



function kakaoShare(){	
	Kakao.Share.sendDefault({
	  objectType: 'feed',
	  content: {
		title: '멍BTI',
		description: '반려견 MBTI ! 내 MBTI를 알려줘멍 !',
		imageUrl:
		  'img/main.png',
		link: {
		  mobileWebUrl: 'https://developers.kakao.com',
		  webUrl: 'https://developers.kakao.com',
		},
	  },
		
	  buttons: [
		{
		  title: '웹으로 이동',
		  link: {
			mobileWebUrl: 'https://developers.kakao.com',
			webUrl: 'https://developers.kakao.com',
		  },
		},
		  
	  ],
	});
}