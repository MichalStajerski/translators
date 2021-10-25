Gramatyka <T,N,S,P>
T = {0,1,2,3,4,5,6,7,8,9,+,-,/,*,()}
N = {S,B,L,O,N,C,R}
S = {S}
P:
S => B //Biale znaki
S => L //Liczba
S => O //Operator
S => N //Nawias
B =>  ''|''B
O => -|+|*|/
N => (|)
L => 0|C|CR
R => 0|C|0R|CR
C => 1|2|3|4|5|6|7|8|9