using Godot;

namespace Clicker
{
	public class MainPanel : Panel
	{
		private int _count;
		private bool _auto;
		private int _increment = 1;

		public override void _Ready()
		{
			GD.Print("Hello, Clicker!");

			var save = new File();
			if (save.FileExists("user://clicker.json"))
			{
				save.Open("user://clicker.json", File.ModeFlags.Read);

				GD.Print("Loaded save file: " + save.GetAsText());

				var data = new Godot.Collections.Dictionary<string, int>((Godot.Collections.Dictionary)JSON.Parse(save.GetLine()).Result);
			
				_count = data["count"];
				_auto = data["auto"] == 1;
				_increment = data["increment"];

				GetNode<Label>("Count").Text = "Successfully loaded!";
			} else
			{
				GetNode<Label>("Count").Text = "Click to start!";
			}

			GetNode("ClickerButton").Connect("pressed", this, nameof(_OnButtonPressed));
		}

		public override void _PhysicsProcess(float delta)
		{
			if (Input.IsActionPressed("c_enter")) _OnButtonPressed();

			if (Input.IsActionPressed("c_up"))
			{
				_increment++;
				GetNode<Label>("Count").Text = "Increment: " + _increment;
			}

			if (Input.IsActionPressed("c_down"))
			{
				_increment--;
				GetNode<Label>("Count").Text = "Increment: " + _increment;
			}

			if (Input.IsActionJustPressed("c_auto"))
			{
				_auto = !_auto;
				GetNode<Label>("Count").Text = _auto ? "Auto: On" : "Auto: Off";
			}
			
			if (_auto) _OnButtonPressed();

			if (Input.IsActionJustPressed("c_quit")) GetTree().Quit();

			if (Input.IsActionJustPressed("c_reset"))
			{
				_count = 0;
				_auto = false;
				_increment = 1;

				GetNode<Label>("Count").Text = "Successfully reset!";
			}

			if (!Input.IsActionJustPressed("c_save")) return;
			var data = new Godot.Collections.Dictionary<string, int>
			{
				{ "count", _count },
				{ "auto", _auto ? 1 : 0 },
				{ "increment", _increment }
			};

			var file = new File();
			file.Open("user://clicker.json", File.ModeFlags.Write);
			var json = JSON.Print(data);
			file.StoreString(json);
			file.Close();

			GD.Print("Saved data: " + json);

			GetNode<Label>("Count").Text = "Successfully saved!";
		}

		public void _OnButtonPressed()
		{
			if (_count <= int.MinValue || _count >= int.MaxValue)
			{
				GetNode<Label>("Count").Text = "Victory! (Click Again To Reset)";
				GD.Print("Victory!");
				_count = -1;
				return;
			}
			else _count += _increment;

			var s = _count == 1 ? ' ' : 's';

			GetNode<Label>("Count").Text = _count.ToString() + " click" + s;
			GD.Print(_count.ToString() + " click" + s);
		}
	}
}
