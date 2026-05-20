#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;

    if (x < 0) {
        cout << "false";
        return 0;
    }

    int original = x;
    long long rev = 0;

    while (x > 0) {
        rev = rev * 10 + (x % 10);
        x /= 10;
    }

    if (rev == original) cout << "true";
    else cout << "false";

    return 0;
}