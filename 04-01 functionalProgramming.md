# 함수형 프로그래밍의 개념

- 함수형 프로그래밍은 함수의 조합으로 작업을 수행함을 의미
- 작업이 수행되는 동안 작업에 필요한 데이터와 상태는 변하지 않음

- 함수형 프로그래밍을 표현하는 슈도 코드

```javascript
// 특정 문자열을 암호화하는 함수
f1 = encrypt1;
f2 = encrypt2;
f3 = encrypt3;
// f1,f2,f3은 입력값이 정해지지 않고, 서로 다른 암호화 알고리즘이 있다.
pure_value = "mina";
encrypted_value = get_encrypted(x);
// pure_value는 암호화할 문자열
// encrypted_value는 암호화된 문자열
// get_encrypted()는 암호화 함수를 받아서 입력받은 함수로 pure_value를 암호화 한후 반환
encrypted_value = get_encrypted(f1);
encrypted_value = get_encrypted(f2);
encrypted_value = get_encrypted(f3);
// 여기서 pure_value는 작업에 필요한 데이터이고 작업이 수행되는 동안 변하지 않음
// get_encrypted()가 작업하는 동한 변할 수 있는 것은 오로지 입력으로 들어오는 함수 뿐
```

- f1,f2,f3은 외부(여기서는 'mina'라는 변수)에 아무런 영향을 미치지 않는 함수라고 할 수 있다. 이를 **순수 함수**라고 한다.
- 외부에 영향을 미치지 않으므로 이미 작성 된 순수 함수로 다른 작업에 활용해도 무방
- get_encrypted 함수는 인자로서 f1,f2,f3 함수를 받음, 여기서는 결과값이 encrypted_value라는 값이지만 결과값을 또 다른 형태의 함수로 반환 가능
- 이렇게 **함수를 또하나의 값으로 간주하여 함수의 인자 혹은 반환값으로 사용할 수 있는 함수를 고계 함수**라 한다.

- 내부 데이터 및 상태는 그대로 둔 채 제어할 함수를 변경 및 조합함으로써 원하는 결과를 얻어내는 것이 함수형 프로그래밍의 특성
