import sys

if __name__ == "__main__":
    for i in range(len(sys.argv)):
        arg = sys.argv

        Type = str(arg[1])
        ID = str(arg[2])
        Option = str(arg[3])
        OptionValue = str(arg[4])

        if i == 1:
            if Type == "--Alliance":
                print(f"Alliance : {ID}")
            if Type == "--Member":
                print(f"Member : {ID}")
        if i == 3:
            print(arg[i])
