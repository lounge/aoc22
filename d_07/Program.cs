long q1Sum = 0;
var folderSizes = new List<long>();
var root = new Folder("/", null);

void Setup(string[] lines)
{
    var activeFolder = root;
    for (int i = 1; i < lines.Length; i++)
    {
        var line = lines[i];
        if (line.StartsWith("$"))
        {
            var strings = line.Split(" ");
            switch (strings[1])
            {
                case "cd":
                    if (strings[2] == "..")
                    {
                        activeFolder = activeFolder?.Parent;
                    }
                    else
                    {
                        var folder = new Folder(strings[2], activeFolder);
                        activeFolder?.Folders.Add(folder);
                        activeFolder = folder;
                    }
                    break;
                case "ls":
                    while (i + 1 < lines.Length && !lines[i + 1].StartsWith("$"))
                    {
                        var infoLine = lines[++i];
                        var splits = infoLine.Split(" ");
                        if (long.TryParse(splits[0], out var fileSize))
                        {
                            activeFolder?.FileSizes.Add(fileSize);
                        }
                    }
                    break;
            }
        }
    }

    GetFolderSize(root);
}

long GetFolderSize(Folder folder)
{
    long folderSize = 0;
    folderSize += folder.FileSizes.Sum();

    foreach (var f in folder.Folders)
    {
        folderSize += GetFolderSize(f);
    }
    if (folderSize < 100000)
    {
        q1Sum += folderSize;
    }

    folderSizes.Add(folderSize);
    folder.FolderSize = folderSize;

    return folderSize;
}

long DeleteAndGetSize()
{
    var availableSpace = 70000000 - root.FolderSize;
    var toDelete = 30000000 - availableSpace;

    var size = folderSizes.Where(x => x >= toDelete).OrderBy(x => x).ToList().FirstOrDefault();
    return size;
}

var lines = File.ReadAllLines("input_01.txt");

Setup(lines);

Console.WriteLine($"q1: {q1Sum}");
Console.WriteLine($"q2: {DeleteAndGetSize()}");

class Folder
{
    public Folder(string name, Folder? parent)
    {
        FolderName = name;
        Folders = new List<Folder>();
        FileSizes = new List<long>();
        Parent = parent;
    }

    public Folder? Parent { get; }
    public string FolderName { get; }
    public List<Folder> Folders { get; }
    public List<long> FileSizes { get; }
    public long FolderSize { get; set; }
}
