using System.Drawing;

var height = "SabcdefghijklmnopqrstuvwxyzE";
var directions = new List<Size> {
    { new Size(1, 0) },
    { new Size(0, 1) },
    { new Size(0, -1) },
    { new Size(-1, 0) }
};

Dictionary<string, int> Dist = new Dictionary<string, int>();
int rowLength, colLength;

bool IsValid(Point adjCell, Point cell, int[][] heightMap)
{
    var isOutOfBound = (adjCell.X < 0 || adjCell.Y < 0 || adjCell.Y >= rowLength || adjCell.X >= colLength) ? true : false;
    if (isOutOfBound)
    {
        return false;
    }

    if (heightMap[cell.Y][cell.X] == height.IndexOf("E"))
    {
        return false;
    }

    return heightMap[adjCell.Y][adjCell.X] - heightMap[cell.Y][cell.X] <= 1;
}

void Run(int[][] heightMap, List<Point> startPoints)
{
    Queue<Tuple<int, Point>> q = new Queue<Tuple<int, Point>>();
    foreach (var p in startPoints)
    {
        q.Enqueue(new Tuple<int, Point>(0, p));

    }

    while (q.Count != 0)
    {
        Tuple<int, Point> queueItem = q.Dequeue();
        var cell = queueItem.Item2;
        if (heightMap[cell.Y][cell.X] == height.IndexOf("E"))
        {
            Console.WriteLine($"{cell}, {queueItem.Item1}!!!!!!");
        }

        if (Dist.ContainsKey(cell.ToString()))
        {
            continue;
        }

        Dist.Add(cell.ToString(), queueItem.Item1);

        for (int i = 0; i < directions.Count; i++)
        {
            var adjCell = cell + directions[i];
            if (!IsValid(adjCell, cell, heightMap))
            {
                continue;
            }
            q.Enqueue(new Tuple<int, Point>(queueItem.Item1 + 1, adjCell));
        }
    }

    Console.WriteLine(Dist.Last());
}

void Q1(string[] lines)
{
    List<Point> startPoints = new List<Point>();

    var heightMap = new int[lines.Length][];
    for (int row = 0; row < lines.Length; row++)
    {
        heightMap[row] = lines[row].ToCharArray().Select(x => height.IndexOf(x)).ToArray();
        if (heightMap[row].Contains(height.IndexOf("S")))
        {
            startPoints.Add(new Point(Array.IndexOf(heightMap[row], height.IndexOf("S")), row));
            heightMap[startPoints[0].Y][startPoints[0].X] = height.IndexOf("a");
        }
    }
    rowLength = heightMap.Length;
    colLength = heightMap[0].Length;

    Run(heightMap, startPoints);
}

void Q2(string[] lines)
{
    List<Point> startPoints = new List<Point>();

    var heightMap = new int[lines.Length][];
    for (int row = 0; row < lines.Length; row++)
    {
        heightMap[row] = lines[row].ToCharArray().Select(x => height.IndexOf(x)).ToArray();
        for (var x = 0; x < heightMap[row].Length; x++)
        {
            if (heightMap[row][x] == 1)
            {
                startPoints.Add(new Point(x, row));
            }
        }
    }
    rowLength = heightMap.Length;
    colLength = heightMap[0].Length;

    Run(heightMap, startPoints);
}

var lines = File.ReadAllLines("input_01.txt");

Q1(lines);
Q2(lines);

Console.ReadLine();

