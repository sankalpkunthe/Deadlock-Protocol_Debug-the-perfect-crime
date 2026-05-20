#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    vector<int> nums;
    char ch;

    cin >> ch;

    int num;
    while (cin >> num) {
        nums.push_back(num);
        cin >> ch;
        if (ch == ']') break;
    }

    int target;
    cin >> target;

    unordered_map<int, int> mp;

    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];

        if (mp.find(complement) != mp.end()) {
            cout << "[" << mp[complement] << "," << i << "]";
            return 0;
        }

        mp[nums[i]] = i;
    }

    return 0;
}