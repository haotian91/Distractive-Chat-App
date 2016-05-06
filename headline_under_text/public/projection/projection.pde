String newWords[];

void setup(){
  background(#000000);
  size(1800, 1000);
  
}

void draw(){  
  background(#000000);
  
  String words[] = loadStrings("texts.txt");
  newWords = split(words[0], ',');
  println("there are " + newWords.length + " words");
  for (int i = 0 ; i < newWords.length; i++) {
    println(newWords[i]);
  }
  textSize(70);
  fill(#F59219);
  for(int i=(newWords.length-10); i<newWords.length; i++){
    text(newWords[i],1000/10*(i-newWords.length+11),800/10*(i-newWords.length+11));  
  }
}



