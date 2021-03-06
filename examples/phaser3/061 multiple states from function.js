var Demo = {};

Demo.Backdrop = function ()
{
    this.picture;
}

Demo.Backdrop.prototype.constructor = Demo.Backdrop;

Demo.Backdrop.prototype = {

    preload: function ()
    {
        this.load.image('bg', 'assets/skies/sky1.png');
        // this.load.image('bg', 'assets/sprites/phaser2.png');
    },

    create: function ()
    {
        this.picture = this.add.image(0, 0, 'bg');
    }

};

Demo.Stars = function ()
{
    this.p;

    this.distance = 300;
    this.speed = 6;

    this.max = 2000;
    this.xx = [];
    this.yy = [];
    this.zz = [];
};

Demo.Stars.prototype.constructor = Demo.Stars;

Demo.Stars.prototype = {

    create: function ()
    {
        this.p = this.add.pixelField(0, 0, 2);

        for (var i = 0; i < this.max; i++)
        {
            this.xx[i] = Math.floor(Math.random() * 800) - 400;
            this.yy[i] = Math.floor(Math.random() * 600) - 300;
            this.zz[i] = Math.floor(Math.random() * 1700) - 100;

            var perspective = this.distance / (this.distance - this.zz[i]);
            var x = 400 + this.xx[i] * perspective;
            var y = 300 + this.yy[i] * perspective;

            this.p.add(x, y, 255, 255, 255, 1);
        }

        // this.sys.fbo.setSize(400, 300);
    },

    update: function ()
    {
        for (var i = 0; i < this.max; i++)
        {
            var perspective = this.distance / (this.distance - this.zz[i]);
            var x = 400 + this.xx[i] * perspective;
            var y = 300 + this.yy[i] * perspective;

            this.zz[i] += this.speed;

            if (this.zz[i] > 300)
            {
                this.zz[i] -= 600;
            }

            this.p.list[i].x = x;
            this.p.list[i].y = y;
        }
    }
};

Demo.Logo = function ()
{
    this.logo;
}

Demo.Logo.prototype.constructor = Demo.Logo;

Demo.Logo.prototype = {

    preload: function ()
    {
        this.load.image('logo', 'assets/sprites/phaser2.png');
    },

    create: function ()
    {
        this.logo = this.add.image(400, 300, 'logo');
        this.logo.anchor = 0.5;
        this.logo.scale = 0.2;

        this.add.tween(this.logo).to( { scaleX: 1, scaleY: 1 }, 3000, "Sine.easeInOut", true, 0, -1, true);
    }

};

window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example');

    game.state.add('Backdrop', Demo.Backdrop, true);
    game.state.add('Stars', Demo.Stars, true);
    game.state.add('Logo', Demo.Logo, true);

    window.game = game;

};
