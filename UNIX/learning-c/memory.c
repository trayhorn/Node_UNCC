#include <stdio.h>
#include <stdlib.h>

int main() {
  // int is 4 bytes (32 bits) - signed
  // int a = 3500;

  // int * myPointer = &a;

  // type casting
  // myPointer = (char *)myPointer;

  // printf("%p", myPointer);

  int * allocatedMemory = malloc(12); //12 bytes

  for (int i = 0; i < 3; i++) {
    allocatedMemory[i] = 1937208183;
  }

  for (int i = 0; i < 3; i++) {
    printf("Number is: %d.\n", allocatedMemory[i]);
  }

  char * charAllocatedMemory = (char *)allocatedMemory;

  for(int i = 0; i < 12; i++) {
    printf("Characted is: %c.\n", charAllocatedMemory[i]);
  }

  return 0;
}