import classes from './MyLoader.module.scss'
import "./MyLoader.animations.scss"
const MyLoader = () => {
    return (
        <div className={classes.MyLoaderLayout}>
            <div className={classes.MyLoader}>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
};

export default MyLoader;