
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvascloud');
    const ctx = canvas.getContext('2d');
    console.log(ctx);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor(effect, x, y, color){
            this.effect = effect;
            this.x = x;
            this.y = y;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap;
            this.vx = 0;
            this.vy = 0;
            this.ease = 1;
            this.friction = 1;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.force = 0;
            this.angle= 0;
        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;
        
            if(this.distance < this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            } else {
                this.vx = 0;
                this.vy = 0;
            }
        
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * 0.2; // Adjust 0.2 to your preference
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * 0.2; // Adjust 0.2 to your preference
        }
        
        warp (){
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.ease= 1;
        }
    }

    class Effect {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.gap = 5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
            this.mouse = {
                radius: 3000,
                x: undefined,
                y: undefined,
            };
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
                console.log(this.mouse.x, this.mouse.y);
            });
        }
        init(context){
            const newWidth = this.image.width * 2;
            const newHeight = this.image.height * 1.4;
            
            this.x = this.centerX - newWidth * 0.5;
            this.y = this.centerY - newHeight * 0.5;
            
            context.drawImage(this.image, this.x, this.y, newWidth, newHeight); 
        
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0; y < this.height; y += this.gap){
                for (let x = 0; x < this.width; x += this.gap){
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = 'rgb('+ red + ',' + green + ',' + blue + ',' + alpha + ')';
        
                    if (alpha > 0){
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        
        draw(context){
            this.particlesArray.forEach(particle => particle.draw(context));
        }
        update(){
            this.particlesArray.forEach(particle => particle.update());
        }
        warp(){
            this.particlesArray.forEach(particle => particle.update());
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    console.log(effect.particlesArray);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx); 
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('scroll', function() {
        const scrollTopButton = document.querySelector('.scrollTop');
        if (window.scrollY > window.innerHeight * 2) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

});
