import { Observable } from 'rxjs';

var requestStream = Observable.of(3,4);

requestStream.subscribe(r => {
    console.log(r)
})
