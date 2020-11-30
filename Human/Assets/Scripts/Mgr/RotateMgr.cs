using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class RotateMgr : MonoBehaviour
{   //金萌萌
    private Ray camerRay;                       //声明射线   
    private RaycastHit cameraHit;               //声明射线检测

    //[Range(1, 20)]
    private float RayDistance = 15;//射线长度
    public Transform bon;     //上一个obg

    public Vector3 OldMousePos;//射线用
    //旋转速度；
    public float speed = 2f;
    //鼠标沿水平方向移动的增量；
    private float axisX;
    //鼠标沿垂直方向移动的增量;
    private float axisY;
    private Vector3 gyroscopeRotation; //限制角度
    public GameObject _Role;
    private bool onDrag;//按下 抬起
    public bool Isgo;
    public int rotx = 90;
    public int roty;

    //滑动距离（鼠标）;
    private float cXY;
    //阻尼速度;
    private float tempSpeed = 2;
    public Text showmsg;
    // Use this for initialization
    void Start()
    {
        rotx = 90;
        roty = 0;
        _Role = GameObject.Find("Human");
    }
    // Update is called once per frame
    void Update()
    {
#if UNITY_ANDROID
    AndroidEndle=true;
    //Debug.Log("这里是安卓设备");
#endif

#if UNITY_IPHONE
        //Debug.Log("这里是苹果设备");
#endif

#if UNITY_STANDALONE_WIN
        //Debug.Log("我是从Windows的电脑上运行的");
        AndroidEndle = false;
        WinRotate();
#endif

        //ClampRot();
    }
    private Touch oldTouch1;  //上次触摸点1(手指1)  
    private Touch oldTouch2;  //上次触摸点2(手指2)  
    public void AndroidRotate()
    {
        //单点触摸， 水平上下移动
        if (onDrag&&Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Moved)
        {
            //DebugText("单点触摸， 水平上下移动");
            Vector2 deltaposition = Input.GetTouch(0).deltaPosition;
            //transform.Translate(new Vector3(deltaposition.x * 0.01f, deltaposition.y * 0.01f, 0f), Space.World);
            axisX = -deltaposition.x * speed;
            axisY = deltaposition.y * speed;
            cXY = Mathf.Sqrt(axisX * axisX + axisY * axisY);
            _Role.transform.Rotate(new Vector3(axisY, axisX, 0), Space.World);
        }
        ////单点触摸， 水平上下旋转  
        //if (Input.touchCount==2)
        //{
        //    //DebugText("单点触摸， 水平上下旋转  ");
        //    Touch touch = Input.GetTouch(0);
        //    Vector2 deltaPos = touch.deltaPosition;
        //    transform.Rotate(Vector3.down * deltaPos.x, Space.World);
        //    transform.Rotate(Vector3.right * deltaPos.y, Space.World);
        //}
        //多点触摸, 放大缩小  
        Touch newTouch1 = Input.GetTouch(0);
        Touch newTouch2 = Input.GetTouch(1);

        //第2点刚开始接触屏幕, 只记录，不做处理  
        if (Input.touchCount == 2&&newTouch2.phase == TouchPhase.Began)
        {
            //DebugText("第2点刚开始接触屏幕, 只记录，不做处理 ");
            onDrag = false;
            oldTouch2 = newTouch2;
            oldTouch1 = newTouch1;
            return;
        }
        //计算老的两点距离和新的两点间距离，变大要放大模型，变小要缩放模型  
        float oldDistance = Vector2.Distance(oldTouch1.position, oldTouch2.position);
        float newDistance = Vector2.Distance(newTouch1.position, newTouch2.position);
        //两个距离之差，为正表示放大手势， 为负表示缩小手势  
        float offset = newDistance - oldDistance;
        if (offset < 0)
        {
            if (Camera.main.fieldOfView <= 100)
                Camera.main.fieldOfView += 2;
        }
        else
        {
            if (Camera.main.fieldOfView > 10)
                Camera.main.fieldOfView -= 2;
        }
        
       
        //放大因子， 一个像素按 0.01倍来算(100可调整)  
        //float scaleFactor = offset / 100f;
        //Vector3 localScale = transform.localScale;
        //Vector3 scale = new Vector3(localScale.x + scaleFactor,
        //                            localScale.y + scaleFactor,
        //                            localScale.z + scaleFactor);
        ////最小缩放到 0.3 倍  
        //if (scale.x > 0.3f && scale.y > 0.3f && scale.z > 0.3f)
        //{
        //    transform.localScale = scale;
        //}

        //记住最新的触摸点，下次使用  
        //oldTouch1 = newTouch1;
        //oldTouch2 = newTouch2;

    }
    public void WinRotate()
    {
        if (Isgo)
        {
            return;
        }
        if (onDrag)//旋转
        {
            axisX = -Input.GetAxis("Mouse X") * speed;
            axisY = Input.GetAxis("Mouse Y") * speed;
            cXY = Mathf.Sqrt(axisX * axisX + axisY * axisY);
            _Role.transform.Rotate(new Vector3(axisY, axisX, 0), Space.World);
        }

        if (Input.GetAxis("Mouse ScrollWheel") < 0)
        {
            if (Camera.main.fieldOfView <= 100)
                Camera.main.fieldOfView += 2;
        }
        if (Input.GetAxis("Mouse ScrollWheel") > 0)
        {
            if (Camera.main.fieldOfView > 10)
                Camera.main.fieldOfView -= 2;
        }
    }
    public bool AndroidEndle;
   
    public void LongPress(bool bStart)
    {
        //Debug.Log("按下点击" + bStart);
        onDrag = bStart;
        if (onDrag)
        {
            OldMousePos = Input.mousePosition;
        }
        else
        {
            float of = Vector3.Distance(Input.mousePosition, OldMousePos);
            if (of < 1)
            {
                RayClick();
            }
        }
    }
    //50  140 220 0
    float Rigid()
    {
        if (onDrag)
        {
            tempSpeed = speed;
        }
        else
        {
            if (tempSpeed > 0)
            {
                if (cXY != 0)
                {
                    tempSpeed = tempSpeed - speed * 2 * Time.deltaTime / cXY;
                }
            }
            else
            {
                tempSpeed = 0;
            }
        }
        return tempSpeed;
    }
    void ClampRot()
    {
        gyroscopeRotation = _Role.transform.rotation.eulerAngles;
        if (gyroscopeRotation.x < 360 && gyroscopeRotation.x > 270)
        {
            if (gyroscopeRotation.y < 140)
            {
                _Role.transform.eulerAngles = new Vector3(0, 140, 0);
            }
            else if (gyroscopeRotation.y > 220)
            {
                _Role.transform.eulerAngles = new Vector3(0, 220, 0);
            }
            else
            {
                _Role.transform.eulerAngles = new Vector3(0, gyroscopeRotation.y, 0);
            }
        }
        else if (gyroscopeRotation.x >= rotx && gyroscopeRotation.x < 330)
        {
            if (gyroscopeRotation.y < 140)
            {
                _Role.transform.eulerAngles = new Vector3(rotx, 140, 0);
            }
            else if (gyroscopeRotation.y > 220)
            {
                _Role.transform.eulerAngles = new Vector3(rotx, 220, 0);
            }
            else
            {
                _Role.transform.eulerAngles = new Vector3(rotx, gyroscopeRotation.y, 0);
            }
            // Debug.Log(rotx + "1111111111");
        }
        else
        {
            if (gyroscopeRotation.y < 140)
            {
                _Role.transform.eulerAngles = new Vector3(gyroscopeRotation.x, 140, 0);
            }
            else if
                (gyroscopeRotation.y > 220)
            {
                _Role.transform.eulerAngles = new Vector3(gyroscopeRotation.x, 220, 0);
            }
            else
            {
                _Role.transform.eulerAngles = new Vector3(gyroscopeRotation.x, gyroscopeRotation.y, 0);
            }
        }
    }
    /// <summary>
    ///  屏幕射线选择
    /// </summary>
    public void RayClick()
    {
        //mousePosition坐标范围： 左下0,0 ~ 右上屏幕像素(width,height)
        Vector3 moupos = new Vector3(Input.mousePosition.x, Input.mousePosition.y, 0);

        //若相机为perspective模式，射线为发散形状；若为orthoGraphic，则为垂直与相机面的直线段
        //此外，默认长度为单位向量
        camerRay = Camera.main.ScreenPointToRay(moupos);

        //物理检测射线，out一个RaycastHit类型的 hitInfo 信息，float distance是射线长度，layerMask为可检测的Layer层
        if (Physics.Raycast(camerRay, out cameraHit, RayDistance, LayerMask.GetMask("Anchor")))
        {
            //Debug.Log(cameraHit.transform.gameObject.name);
            if (bon != null)
            {
                bon.transform.gameObject.GetComponent<MeshRenderer>().material.color = Color.white;
                if (bon == cameraHit.transform)
                {
                    bon.transform.gameObject.GetComponent<MeshRenderer>().material.color = Color.white;
                    showmsg.text = "";
                    bon = null;
                    return;
                }
            }
            bon = cameraHit.transform;
            showmsg.text = bon.name;
            cameraHit.transform.gameObject.GetComponent<MeshRenderer>().material.color = Color.green;//..material = material;
                                                                                                     //inittexture(cameraHit);
        }
        Debug.DrawRay(camerRay.origin, camerRay.direction * RayDistance, Color.red);
    }
}