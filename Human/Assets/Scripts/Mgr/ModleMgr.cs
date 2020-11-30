using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using DG.Tweening;
using UnityEditor;

public class ModleMgr : MonoBehaviour
{
    public Transform _PaName;

    public GameObject _ObgParent;
    public RotateMgr RoMgr;
    public Button[] InitBtns;
    public Toggle[] InitTogs;

    public RectTransform Showle;
    public RectTransform Showre;

    public bool ShowBtns=false;
    public bool OneShow ;

    // Start is called before the first frame update
    void Start()
    {
        OneShow = true;
        //GetChildName();
        _ObgParent = GameObject.Find("Human").gameObject;
        RoMgr = transform.GetComponent<RotateMgr>();

        Showle = transform.Find("Btn/left").GetComponent<RectTransform>();
        Showre = transform.Find("Btn/right").GetComponent<RectTransform>();

        InitBtns = transform.Find("").GetComponentsInChildren<Button>();
        InitTogs = transform.Find("").GetComponentsInChildren<Toggle>();
        for (int i = 0; i < InitBtns.Length; i++)
        {
            InitBtns[i].onClick.AddListener(OnButtonClick);
        }
        for (int j = 0; j < InitTogs.Length; j++)
        {
            InitTogs[j].onValueChanged.AddListener(OnToggleClick);
        }
    }
    // Update is called once per frame
    void Update()
    {
        //transform.position = Vector3.MoveTowards(start.position, end.position, speed * Time.deltaTime);
        // transform.DOMove(new Vector3(1, 1, 1), 2);
    }
    public void OnButtonClick()
    {
        GameObject buttons = EventSystem.current.currentSelectedGameObject;//按钮名称
        switch (buttons.name)
        {
            case "PutBtn":
                buttons.transform.Find("Txt").GetComponent<Text>().text = ShowBtns ? "隐" : "显";
                OnPutBtnClick();
                ShowBtns = !ShowBtns;
                break;
            case "ResetBtn":
                //_ObgParent.transform.localEulerAngles = new Vector3(0, 180, 0);
                DOTween.To(() => { return _ObgParent.transform.localEulerAngles; }, v => { _ObgParent.transform.localEulerAngles = v; }, new Vector3(0, 180, 0), 1f);
                break;
            case "HideBtn":
                if (RoMgr!=null)
                {
                    RoMgr.bon.gameObject.SetActive(false);
                }
                break;
            case "ShowBtn":
                //Debug.Log(OneShow+"11111111111");
                if (RoMgr != null)
                {
                    OneShow = !OneShow;
                    if (OneShow)
                    {
                        Destroy(RoMgr._Role);
                        _ObgParent.SetActive(true);
                        RoMgr._Role = _ObgParent;
                        return;
                    }
                    GameObject target = Instantiate( RoMgr.bon).gameObject;
                    _ObgParent.SetActive(false);
                    //获取目标物体下所有网格渲染
                    MeshRenderer[] meshRenderers = target.GetComponentsInChildren<MeshRenderer>(true);
                    //if (meshRenderers.Length == 0)
                    //{
                    //    EditorUtility.DisplayDialog(dialogTitle, "选中的物体不是有效模型物体!!!", "确定");
                    //    return;
                    //}
                    //将所有的网格渲染的边界进行合并
                    Bounds centerBounds = meshRenderers[0].bounds;
                    for (int i = 1; i < meshRenderers.Length; i++)
                    {
                        centerBounds.Encapsulate(meshRenderers[i].bounds);
                    }
                    //创建目标的父物体
                    Transform targetParent = new GameObject("-Parent").transform;

                    //如果目标原来已有父物体,则将创建目标父物体的父物体设为原父物体;
                    Transform originalParent = target.transform.parent;
                    if (originalParent != null)
                    {
                        targetParent.SetParent(originalParent);
                    }
                    //设置目标父物体的位置为合并后的网格渲染边界中心
                    targetParent.position = centerBounds.center;
                    //设置目标物体的父物体
                    target.transform.parent = targetParent;
                    targetParent.position = new Vector3(0, 0, 0);
                    Selection.activeGameObject = targetParent.gameObject;
                    RoMgr._Role = targetParent.gameObject;
                    
                }
                break;
            default: /* 可选的 */
                //statement(s);
                break;
        }
    }
    public void OnToggleClick(bool isOn)
    {
        GameObject tsToggle = EventSystem.current.currentSelectedGameObject;
        Text co = tsToggle.transform.Find("Txt").GetComponent<Text>();
        if (isOn) { co.color = Color.black; }
        else { co.color = Color.white; }
        //Debug.Log(tsToggle.name+"111"+isOn);
        switch (tsToggle.name)
        {
            case "SkinBtn":
                this.ChildAction(_ObgParent.transform.Find("Skin"), isOn);
                break;
            case "BoneBtn":
                this.ChildAction(_ObgParent.transform.Find("Skeleton"), isOn);
                break;
            case "VeinBtn":
                this.ChildAction(_ObgParent.transform.Find("Vein"), isOn);
                break;
            case "ArteryBtn":
                this.ChildAction(_ObgParent.transform.Find("Artery"), isOn);
                break;
            case "MuscleBtn":
                this.ChildAction(_ObgParent.transform.Find("Muscle"), isOn);
                break;
            case "VisceraBtn":
                this.ChildAction(_ObgParent.transform.Find("viscera"), isOn);
                break;
            default:
                break;
        }
    }
    public void ChildAction(Transform tr, bool bo)
    {
        tr.transform.gameObject.SetActive(bo);
        if (tr.childCount == 0)
        {
            return;
        }
        for (int i = 0; i < tr.childCount; i++)
        {
            tr.GetChild(i).gameObject.SetActive(bo);
            if (tr.GetChild(i).childCount > 0)
            {
                ChildAction(tr.GetChild(i), bo);
            }
        }
    }
    public void OnPutBtnClick()
    {
        int endle;
        int endre;
        if (ShowBtns)
        {
            endle = 0;
            endre = -5;
        }
        else
        {
            endle = -80;
            endre = 85;
        }
        DOTween.To(() => { return Showle.anchoredPosition; }, v => { Showle.anchoredPosition = v; }, new Vector2(endle, 412), 0.5f);
        DOTween.To(() => { return Showre.anchoredPosition; }, v => { Showre.anchoredPosition = v; }, new Vector2(endre, 475), 0.5f);
    }
    public void GetChildName()
    {
        if (_PaName == null)
        {
            return;
        }
        string _Name = "\"";
        for (int i = 0; i < _PaName.childCount; i++)
        {
            _Name += _PaName.GetChild(i).gameObject.name + "\",\"";
        }
        Debug.Log(_PaName.childCount + "," + _Name);

    }
    #region 废弃
    /*
    public void Init()
    {

        Button[] bts = transform.Find("").GetComponentsInChildren<Button>();
        foreach (Button bt in bts)
        {
            if (bt.gameObject.tag != "scbtn")
            {
                EventTriggerListener.Get(bt.gameObject).onClick = onClick;
            }

        }
        Toggle[] tgs = transform.Find("").GetComponentsInChildren<Toggle>();
        foreach (Toggle tg in tgs)
        {
            if (tg.gameObject.tag != "scbtn")
            {
                EventTriggerListener.Get(tg.gameObject).onClick = onClick;
            }

        }
        OnInitData();
    }
     public void GetButtons()
    {
        Button[] bts = transform.Find("").GetComponentsInChildren<Button>();
        foreach (Button bt in bts)
        {
            if (bt.gameObject.tag != "scbtn")
            {
                //EventTriggerListener.Get(bt.gameObject).onClick = onClick;
            }

        }
        Toggle[] tgs = transform.Find("").GetComponentsInChildren<Toggle>();
        foreach (Toggle tg in tgs)
        {
            if (tg.gameObject.tag != "scbtn")
            {
                //EventTriggerListener.Get(tg.gameObject).onClick = onClick;
            }

        }
    }
    */
    #endregion
}
