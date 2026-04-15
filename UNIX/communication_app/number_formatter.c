#include <stdio.h>
#include <stdlib.h>

char* formatNumber(char* input, char begin, char divider) {
  
}

int main(int argc, char* argv[]) {

  // Open a file for writing
  FILE *outputFile = fopen(argv[1], "w");

  // Allocate memory to save one complete number into
  char *number = (char *)malloc(10 * sizeof(char));
  int index = 0;

  int c = fgetc(stdin);

  // Keep reading until we get the End of File sign
  while(c != EOF) {

    // Accumulate the digits until we completely accumulate a number
    if(c != ' ') {
      number[index] = c;
      index++;
    }

    if(c == ' ') {
      if(index > 0) {
        // End of string (number) as we completely read the number
        number[index] = '\0';

        // Format the number that we jut read
        char* formatterNumber = formatNumber(number, argv[2][0], argv[3][0]);
        //Write to destination stream
        fprintf(outputFile, " %s ", number);
        fflush(outputFile);

        // Resetting....
        free(number);
        number = (char *)malloc(10 * sizeof(char));
        index = 0;
      }
    }

    c = fgetc(stdin);
  }

  fclose(outputFile);

  exit(0);
}