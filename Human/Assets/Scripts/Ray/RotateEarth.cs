using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class RotateEarth : MonoBehaviour
{

    private Ray camerRay;                       //声明射线   
    private RaycastHit cameraHit;               //声明射线检测

    [Range(1, 20)]
    public float RayDistance;
    public Text _text;

    //private Material mat;
    private Transform bon;

    private Vector3 mousePos;   //记录将鼠标
                                //
    private Vector3 OldMousePos;

    //是否被拖拽；
    private bool onDrag = false;

    //旋转速度；
    public float speed = 2f;

    //阻尼速度;
    private float tempSpeed;

    //鼠标沿水平方向移动的增量；
    private float axisX;

    //鼠标沿垂直方向移动的增量;
    private float axisY;

    //滑动距离（鼠标）;
    private float cXY;

    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {


        //如果鼠标抬起//离开屏幕则标记为已经不再拖拽;

        if (Input.GetMouseButtonDown(0))
        {
            OldMousePos = Input.mousePosition;
            axisX = 0f;
            axisY = 0f;
        }
        if (Input.GetMouseButtonUp(0))
        {
            RayClick();
        }
        if (Input.GetMouseButton(0))
        {
            onDrag = true;
            axisX = -Input.GetAxis("Mouse X") * speed;
            axisY = Input.GetAxis("Mouse Y") * speed;
            cXY = Mathf.Sqrt(axisX * axisX + axisY * axisY);
        }
        else
        {
            axisX = 0f;
            axisY = 0f;
            onDrag = false;
        }
        if (Input.GetAxis("Mouse ScrollWheel") < 0)
        {
            if (Camera.main.fieldOfView <= 100)
                Camera.main.fieldOfView += 2;
        }
        //Zoom in
        if (Input.GetAxis("Mouse ScrollWheel") > 0)
        {
            if (Camera.main.fieldOfView > 10)
                Camera.main.fieldOfView -= 2;
        }


        //float rigidSpeed = Rigid();

        //根据计算出的阻尼和X，Y轴的偏移来旋转地球;
        //gameObject.transform.Rotate(new Vector3(axisY, axisX, 0) * rigidSpeed, Space.World);
        //if (transform.localEulerAngles.x < 60 && axisY < 0)
        //{
        //    Debug.Log("UP");
        //    axisY = 0;
        //}
        //if (transform.localEulerAngles.x > 150 && axisY > 0)
        //{
        //    Debug.Log("Down");
        //    axisY = 0;
        //}
        //Debug.Log(transform.localEulerAngles.x + "0000000" + axisY);
        gameObject.transform.Rotate(new Vector3(axisY, axisX, 0));
        ClampRot(-60,60);

    }
    /// <summary>
    ///  屏幕射线选择
    /// </summary>
    public void RayClick()
    {

        //mousePosition坐标范围： 左下0,0 ~ 右上屏幕像素(width,height)
        mousePos.x = Input.mousePosition.x;
        mousePos.y = Input.mousePosition.y;
        mousePos.z = 0;
        float dis = Vector3.Distance(OldMousePos, mousePos);
        if (dis > 20)
        {
            return;
        }
        //若相机为perspective模式，射线为发散形状；若为orthoGraphic，则为垂直与相机面的直线段
        //此外，默认长度为单位向量
        camerRay = Camera.main.ScreenPointToRay(mousePos);

        //物理检测射线，out一个RaycastHit类型的 hitInfo 信息，float distance是射线长度，layerMask为可检测的Layer层
        if (Physics.Raycast(camerRay, out cameraHit, RayDistance, LayerMask.GetMask("Anchor")))
        {
            Debug.Log(cameraHit.transform.gameObject.name);
            _text.text = cameraHit.transform.gameObject.name;
            inittexture(cameraHit);
        }
        Debug.DrawRay(camerRay.origin, camerRay.direction * RayDistance, Color.red);
    }

    private void inittexture(RaycastHit cameraHit)
    {
        if (bon != null)
        {
            bon.transform.gameObject.GetComponent<MeshRenderer>().material.color = Color.white;
            // Debug.Log(bon.transform.gameObject.name+"1111111111111111111111111111111");
        }
        bon = cameraHit.transform;
        //mat = cameraHit.transform.gameObject.GetComponent<MeshRenderer>().material;
        cameraHit.transform.gameObject.GetComponent<MeshRenderer>().material.color = Color.green;//..material = material;
    }
    //计算阻尼速度;
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
    Vector3 v3;

    /// <summary>

    /// 限制倾斜角度

    /// </summary>

    void ClampRot(float minZ, float maxZ)

    {

        v3 = transform.localEulerAngles;



        if (transform.localEulerAngles.z > maxZ && transform.localEulerAngles.z <= maxZ + 10)//z控制在30一下

        {

            v3.z = maxZ;

        }

        else if (transform.localEulerAngles.z > 350 + minZ && transform.localEulerAngles.z < 360 + minZ)

        {

            v3.z = 360 + minZ;

        }

        transform.localEulerAngles = v3;

    }

    /*
   //鼠标移动的距离;
   void OnMouseDown()
   {
       axisX = 0f;
       axisY = 0f;
       //oldRotate = 0;
       //Debug.Log ("click the ball");
   }

   //鼠标拖拽时的操作;
   void OnMouseDrag()
   {
       onDrag = true;
       axisX = -Input.GetAxis("Mouse X");
       axisY = Input.GetAxis("Mouse Y");
       cXY = Mathf.Sqrt(axisX * axisX + axisY * axisY);
   }*/
}
