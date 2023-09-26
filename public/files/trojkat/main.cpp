#include <iostream>

using namespace std;

int main()
{
    int a,b,c;
    cout << "Podaj pierwszy bok: " << endl;
    cin >> a;
    cout << "Podaj drugi bok: " << endl;
    cin >> b;
    cout << "Podaj trzeci bok: " << endl;
    cin >> b;
    if(a + b > c){
        if(a + c > b){
            if(c + b > a){
                cout << "Ten trojkat jest poprawny";
            } else {
                cout << "Ten trojkat nie jest poprawny";
            }
        } else {
                cout << "Ten trojkat nie jest poprawny";
            }
    } else {
                cout << "Ten trojkat nie jest poprawny";
            }
    return 0;
}
