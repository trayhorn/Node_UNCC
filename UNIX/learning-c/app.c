#include <stdio.h>

int add (int a, int b) {
  return a + b;
}

int main() {

  // int, size_t, char, float

  // char my_character = 'g';

  // int a = 20;
  // int b = 30;
  // int c = add(a, b);

  // size_t t = 18446744073709551615ULL;

  char myStr[6];

  myStr[0] = 'T';
  myStr[1] = 'e';
  myStr[2] = 's';
  myStr[3] = 't';
  myStr[4] = '\0';

  printf("My string is: %s.\n", myStr);


  // fprintf(stdout, "address is %p.\n", &t);

  return 0;
}