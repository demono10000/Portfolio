#include <iostream>

using namespace std;

float a,b,c,d,e,sr,nbsr,bl;

int main()
{
    cout << "Podaj 5 liczb: ";
    cin>>a>>b>>c>>d>>e;
    sr=(a+b+c+d+e)/5;
    nbsr=a;
    bl=sr-b;
    if(bl<0) bl=bl*-1;
    if(bl<(sr-nbsr)) nbsr=b;
    bl=sr-c;
    if(bl<0) bl=bl*-1;
    if(bl<(sr-nbsr)) nbsr=c;
    bl=sr-d;
    if(bl<0) bl=bl*-1;
    if(bl<(sr-nbsr)) nbsr=d;
    bl=sr-e;
    if(bl<0) bl=bl*-1;
    if(bl<(sr-nbsr)) nbsr=e;
    cout<<"srednia: "<<sr;
    cout<<"\nnajblizej: "<<nbsr;
    return 0;
}
